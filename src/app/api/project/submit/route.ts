import { NextResponse } from "next/server";
import { after } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enterprise Engineering: Exponential Backoff Retry mechanism for unstable serverless connections
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, baseDelay = 1000): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.warn(`[RETRY] Operation failed, retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const clientEmail = formData.get("email") as string;
    const location = formData.get("location") as string;
    const projectType = formData.get("projectType") as string;
    const businessName = formData.get("businessName") as string;
    const timeline = formData.get("timeline") as string;
    const budget = formData.get("budget") as string;
    const details = formData.get("details") as string;
    const source = formData.get("source") as string || "Email Submission";
    
    // Extract files first so we can upload them to Cloudinary
    const files = formData.getAll("files") as File[];
    
    // Enterprise Security: Server-side file size validation (10MB limit)
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds the 10MB limit.` },
          { status: 400 }
        );
      }
    }

    // Pre-extract array buffers synchronously so we have the file data
    // even after the request officially terminates
    const extractedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        buffer: Buffer.from(await file.arrayBuffer())
      }))
    );

    after(async () => {
      // Upload to Cloudinary & Prepare for Email (IN PARALLEL)
      const uploadPromises = extractedFiles.map(async (file) => {
        const emailAttachment = {
        filename: file.name,
        content: file.buffer,
        contentType: file.type,
      };

      try {
        const secureUrl = await new Promise<string>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "flamo/requests", resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result!.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
        return { emailAttachment, secureUrl };
      } catch (uploadError) {
        console.error("Cloudinary upload failed for file:", file.name, uploadError);
        return { emailAttachment, secureUrl: null };
      }
    });

    // Wait for all file uploads to Cloudinary concurrently
    const uploadResults = await Promise.all(uploadPromises);
    
    const emailAttachments = uploadResults.map(r => r.emailAttachment);
    const uploadedUrls = uploadResults.map(r => r.secureUrl).filter(url => url !== null) as string[];

    // Execute DB insertion and all emails concurrently
    try {
      const dbPromise = withRetry(() => prisma.projectRequest.create({
        data: {
          name,
          email: clientEmail || "N/A",
          location,
          projectType,
          businessName,
          timeline,
          budget,
          details,
          source,
          attachments: uploadedUrls
        }
      }));

      if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.RECEIVER_EMAIL) {
        throw new Error("SMTP credentials or Receiver Email not configured on the server");
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const htmlContent = `
        <h2>New Project Request from ${name}</h2>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Client Email:</strong> ${clientEmail || 'N/A'}</p>
        <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <br/>
        <h3>Project Details:</h3>
        <p>${details}</p>
      `;

      const emailPromises = [];

      // 1. Send internal notification to Emmanuel
      emailPromises.push(
        withRetry(() => transporter.sendMail({
          from: `"Softverse Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.RECEIVER_EMAIL as string, // Destination email
          subject: `New Project Request: ${projectType} from ${name}`,
          html: htmlContent,
          attachments: emailAttachments,
        }))
      );

      // 2. Send professional auto-reply to the client
      if (clientEmail) {
        const autoReplyHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0b090f; color: #ffffff; border-radius: 12px; border: 1px solid #1a1a1a;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://flamegreat.tech/assets/softverse.svg" alt="Emmanuel Logo" style="height: 36px; margin-bottom: 20px;" />
              <h2 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0;">Project Request Received</h2>
            </div>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for reaching out. We have securely received your project request for <strong>${businessName || 'your business'}</strong>.
            </p>
            
            <div style="background-color: #110e16; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <h3 style="color: #a65abf; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 16px;">Next Steps</h3>
              <ul style="color: #a1a1aa; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our engineering team will review your technical requirements.</li>
                <li>We will analyze the scope, timeline (${timeline}), and budget parameters.</li>
                <li>You will receive a follow-up email from Emmanuel U. Iziogo within 24-48 hours to discuss the architecture and execution plan.</li>
              </ul>
            </div>

            <div style="background-color: #1a1523; border: 1px solid #3b2a45; border-radius: 8px; padding: 24px; margin-bottom: 30px; text-align: center;">
              <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">Want to discuss this right now?</h3>
              <p style="color: #d4d4d8; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
                You don't have to wait 48 hours. Fast-track the process by scheduling a complimentary 15 or 30-minute discovery call directly on my calendar.
              </p>
              <a href="${req.headers.get("origin") || "https://flamegreat.tech"}/consultation" style="display: inline-block; background-color: #a65abf; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                Schedule Free Consultation
              </a>
            </div>

            <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin-bottom: 40px;">
              If you need to provide any additional information or files, simply reply directly to this email.
            </p>

            <div style="border-top: 1px solid #2a2a2a; padding-top: 32px; text-align: center;">
              <h2 style="color: #ffffff; font-size: 18px; font-weight: 800; letter-spacing: 2px; margin: 0 0 8px 0;">EMMANUEL</h2>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 24px 0;">
                Founder & Lead Engineer, Exoper
              </p>
              
              <div style="margin-bottom: 24px;">
                <a href="https://wa.me/+2348136872013" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="24" height="24" />
                </a>
                <a href="https://github.com/FlameGreat-1" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" width="24" height="24" style="background-color: white; border-radius: 50%;" />
                </a>
                <a href="https://www.linkedin.com/in/flamegreat/" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" width="24" height="24" />
                </a>
                <a href="https://www.facebook.com/" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg" alt="Facebook" width="24" height="24" />
                </a>
              </div>
              
              <p style="color: #71717a; font-size: 12px; margin: 0;">
                © 2024-2026 Emmanuel U. Iziogo. All rights reserved.
              </p>
            </div>
          </div>
        `;

        emailPromises.push(
          withRetry(() => transporter.sendMail({
            from: `"Emmanuel U. Iziogo" <${process.env.SMTP_USER}>`,
            to: clientEmail,
            replyTo: process.env.RECEIVER_EMAIL as string,
            subject: `Re: Your Project Request - ${businessName || projectType}`,
            html: autoReplyHtml,
          }))
        );
      }

      // Execute DB and Emails completely in parallel
      await Promise.all([
        dbPromise,
        Promise.all(emailPromises).catch(err => {
          console.error("Failed to send emails, but lead was saved:", err);
        })
      ]);

    } catch (error) {
      // Rollback / Fail-safe: If DB totally fails after 3 retries, log raw data so it's not lost
      console.error("CRITICAL: DB Insertion failed completely. Fallback raw lead data:", JSON.stringify({
        name, email: clientEmail, location, projectType, businessName, timeline, budget, details, source, uploadedUrls
      }, null, 2));
      throw error;
    }
    });

    return NextResponse.json({ success: true, message: "Project queued successfully" });
  } catch (error: any) {
    console.error("Project submit error:", error);
    return NextResponse.json(
      { error: "Failed to process project submission" },
      { status: 500 }
    );
  }
}
