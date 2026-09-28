/**
 * fileStore.ts
 *
 * IndexedDB persistence layer for staged file attachments.
 *
 * Why IndexedDB and not localStorage?
 * - localStorage is limited to ~5-10MB total and only stores strings.
 * - A single 5MB file encodes to ~6.7MB base64 — overflowing localStorage.
 * - IndexedDB can store hundreds of MB of binary data with no practical limit.
 * - It is built into every browser (Chrome, Firefox, Safari, all mobile) — zero dependencies.
 *
 * Architecture:
 * - Database : "flamo_db"  (version 1)
 * - Store    : "staged_files"
 * - Key      : "current"  (single record — the full Attachment[] array)
 *
 * All functions are safe to call in any environment:
 * - SSR (Next.js server): returns silently — no window/indexedDB access
 * - Private browsing   : IndexedDB may be disabled — all errors are caught silently
 * - Normal browser     : full read/write/delete support
 */

const DB_NAME = "flamo_db";
const DB_VERSION = 1;
const STORE_NAME = "staged_files";
const FILES_KEY = "current";

export interface StoredAttachment {
  name: string;
  mimeType: string;
  data: string; // base64
}

/**
 * Opens (or creates) the IndexedDB database.
 * Creates the object store on first run via onupgradeneeded.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    // SSR guard — indexedDB does not exist on the server
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available in this environment."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Simple key-value store — no keyPath, keys supplied manually
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("IndexedDB open request was blocked."));
  });
}

/**
 * Saves the staged file attachments to IndexedDB.
 * Replaces any previously stored files atomically.
 * Silently no-ops if IndexedDB is unavailable.
 */
export async function saveStagedFiles(files: StoredAttachment[]): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(files, FILES_KEY);

      req.onerror = () => reject(req.error);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  } catch {
    // IndexedDB unavailable (private browsing, SSR, quota) — silently ignore
  }
}

/**
 * Loads the staged file attachments from IndexedDB.
 * Returns an empty array if nothing is stored or if IndexedDB is unavailable.
 */
export async function loadStagedFiles(): Promise<StoredAttachment[]> {
  try {
    const db = await openDB();
    const result = await new Promise<StoredAttachment[]>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(FILES_KEY);

      req.onsuccess = () => {
        db.close();
        // Validate the result is an array before returning
        const value = req.result;
        if (Array.isArray(value)) {
          resolve(value);
        } else {
          resolve([]);
        }
      };
      req.onerror = () => {
        db.close();
        resolve([]);
      };
    });
    return result;
  } catch {
    return [];
  }
}

/**
 * Clears all staged file attachments from IndexedDB.
 * Called when files are sent or explicitly removed.
 * Silently no-ops if IndexedDB is unavailable.
 */
export async function clearStagedFiles(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(FILES_KEY);

      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve(); // Resolve anyway — clearing is best-effort
      };
    });
  } catch {
    // Silently ignore
  }
}
