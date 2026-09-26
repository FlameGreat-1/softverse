import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const projectType = formData.get("projectType") as string;
    const businessName = formData.get("businessName") as string;
    const timeline = formData.get("timeline") as string;
    const budget = formData.get("budget") as string;
    const details = formData.get("details") as string;
    const source = formData.get("source") as string || "Email Submission";
    
    // Extract files
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

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { error: "SMTP credentials not configured on the server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // e.g. 'flamegreat@gmail.com'
        pass: process.env.SMTP_PASS, // e.g. App Password
      },
    });

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        };
      })
    );

    const htmlContent = `
      <h2>New Project Request from ${name}</h2>
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <br/>
      <h3>Project Details:</h3>
      <p>${details}</p>
    `;

    await transporter.sendMail({
      from: `"Softverse Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself
      subject: `New Project Request: ${projectType} from ${name}`,
      html: htmlContent,
      attachments: attachments,
    });

    return NextResponse.json({ success: true, message: "Project submitted successfully" });
  } catch (error: any) {
    console.error("Project submit error:", error);
    return NextResponse.json(
      { error: "Failed to process project submission" },
      { status: 500 }
    );
  }
}
