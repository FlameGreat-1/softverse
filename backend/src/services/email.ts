import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;

if (user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, 
    auth: {
      user,
      pass,
    },
  });
} else {
  console.warn("SMTP credentials missing in .env. Emails will not be sent.");
}

export const sendProjectEmail = async (projectData: any, fileUrls: string[]) => {
  if (!transporter) return;

  const receiver = process.env.RECEIVER_EMAIL || user;

  const { name, location, projectType, businessName, timeline, budget, details } = projectData;

  const htmlBody = `
    <h2>New Project Inquiry from ${name}</h2>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Project Type:</strong> ${projectType}</p>
    <p><strong>Business Name:</strong> ${businessName}</p>
    <p><strong>Timeline:</strong> ${timeline}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    <br/>
    <h3>Project Details:</h3>
    <p>${details}</p>
    <br/>
    <h3>Attachments:</h3>
    ${
      fileUrls.length > 0 
        ? `<ul>${fileUrls.map(url => `<li><a href="${url}">${url}</a></li>`).join('')}</ul>` 
        : "<p>No files attached.</p>"
    }
  `;

  const mailOptions = {
    from: user,
    to: receiver,
    subject: `New Project: ${projectType} for ${businessName}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
