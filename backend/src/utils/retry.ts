/**
 * Executes a promise-returning function with exponential backoff and retries.
 * @param operation The function to execute.
 * @param maxRetries Maximum number of retries before failing.
 * @param baseDelayMs The initial delay in milliseconds before the first retry.
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let attempt = 0;
  
  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt > maxRetries) {
        throw new Error(`Operation failed after ${maxRetries} retries: ${error}`);
      }
      
      // Exponential backoff: baseDelay * 2^(attempt - 1)
      const delayMs = baseDelayMs * Math.pow(2, attempt - 1);
      // Add jitter to prevent thundering herd
      const jitter = Math.random() * 200;
      
      console.warn(`[Retry ${attempt}/${maxRetries}] Operation failed, retrying in ${delayMs + Math.round(jitter)}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs + jitter));
    }
  }
}
