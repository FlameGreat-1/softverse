import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, message } = await req.json();

    if (!fullName || !email || !message) {
      return new Response("Missing Fields", { status: 400 });
    }

    // Transporter. Using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // email content
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Message from ${fullName}`,
      text: message,
      html: `
                <h3>New message from your portfolio contact form from ${fullName}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/> ${message}</p>
                `,
    });

    return new Response("Message sent!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error sending message", { status: 500 });
  }
}
