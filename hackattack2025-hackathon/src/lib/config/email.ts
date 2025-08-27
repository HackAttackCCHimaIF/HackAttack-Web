"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function sendMessage(
  email: string,
  name: string,
  message: string
) {
  const messageTemplate = fs.readFileSync(
    path.join(process.cwd(), "public", "email-template", "sendmessage.html"),
    "utf8"
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const mailOptions = {
      from: `HackAttack 2025 by CCIHimaIF <${process.env.EMAIL_FROM}>`,
      to: "hackattack.ccihimaif25@gmail.com",
      replyTo: email,
      subject: "Pertanyaan Terkait HackAttack via Web Hackathon",
      html: messageTemplate
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{message}}", message),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending Message:", error);
    return { success: false, error };
  }
}
