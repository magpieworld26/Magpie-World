import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { email, subject, message } = req.body ?? {};

  if (
    typeof email !== "string" || email.trim().length === 0 || email.length > 254 || !email.includes("@") ||
    typeof subject !== "string" || subject.trim().length === 0 || subject.length > 200 ||
    typeof message !== "string" || message.trim().length === 0 || message.length > 5000
  ) {
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: email.trim(),
      to: "support@magpieworld.com",
      subject: `[Contact Form] ${subject.trim()}`,
      text: `From: ${email.trim()}\n\n${message.trim()}`,
      html: `<p><strong>From:</strong> ${esc(email.trim())}</p><p>${esc(message.trim()).replace(/\n/g, "<br>")}</p>`,
    });
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Failed to send email. Please try again later." });
  }
});

export default router;
