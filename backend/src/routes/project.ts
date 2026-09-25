import { Router, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { uploadToR2 } from "../services/s3";
import { sendProjectEmail } from "../services/email";
import { withRetry } from "../utils/retry";

const router = Router();

// Enterprise standard: use disk storage to prevent memory overflow on large uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

/**
 * Background worker to process the upload and email securely,
 * implementing retry logic and exponential backoff.
 */
async function processSubmissionInBackground(projectData: any, files: Express.Multer.File[]) {
  const fileUrls: string[] = [];

  try {
    console.log(`[Job] Starting background processing for project: ${projectData.businessName}`);

    // 1. Upload files to Cloudflare R2 with exponential backoff
    if (files && files.length > 0) {
      for (const file of files) {
        // Retry up to 4 times for each file upload
        const url = await withRetry(async () => {
          console.log(`[Job] Uploading ${file.originalname}...`);
          return await uploadToR2(file.path, file.originalname, file.mimetype);
        }, 4, 1000);
        
        if (url) fileUrls.push(url);
      }
    }

    // 2. Send Email with exponential backoff
    await withRetry(async () => {
      console.log(`[Job] Dispatching email...`);
      await sendProjectEmail(projectData, fileUrls);
    }, 3, 2000);

    console.log(`[Job] Successfully processed submission for ${projectData.businessName}`);

  } catch (error) {
    console.error(`[Job] FATAL ERROR processing submission for ${projectData.businessName}:`, error);
  } finally {
    // 3. Cleanup: Always delete local files to prevent disk space leaks
    if (files && files.length > 0) {
      for (const file of files) {
        fs.unlink(file.path, (err) => {
          if (err) console.error(`[Cleanup] Failed to delete local file ${file.path}:`, err);
        });
      }
    }
  }
}

router.post("/submit", upload.array("files"), (req: Request, res: Response) => {
  try {
    const { name, location, projectType, businessName, timeline, budget, details } = req.body;
    const files = req.files as Express.Multer.File[] || [];

    const projectData = {
      name, location, projectType, businessName, timeline, budget, details
    };

    // Fire and forget: offload heavy lifting to background
    processSubmissionInBackground(projectData, files);

    // Immediately return 202 Accepted to the frontend
    res.status(202).json({ 
      success: true, 
      message: "Project submission accepted. Processing in the background." 
    });

  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export default router;
