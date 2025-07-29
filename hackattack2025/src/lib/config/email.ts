"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import {
  checkEmailListUnnotified,
  updateStatusBroadcasted,
} from "@/lib/services/notification";

export async function sendWelcomeEmail(email: string) {
  const notifyMeTemplate = fs.readFileSync(
    path.join(
      process.cwd(),
      "public",
      "email-template",
      "notifyme-update-white.html"
    ),
    "utf8"
  );

  const message = {
    from: `HackAttack.CCIHimaIF <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "🚀 You’re In! HackAttack2025 Is Now on Your Radar",
    html: notifyMeTemplate.replace("{{email}}", email),
    attachments: [
      {
        filename: "header.png",
        path: path.join(
          process.cwd(),
          "public",
          "email-template",
          "email-asset",
          "header.png"
        ),
        cid: "header",
      },
      {
        filename: "banner.png",
        path: path.join(
          process.cwd(),
          "public",
          "email-template",
          "email-asset",
          "banner.png"
        ),
        cid: "banner",
      },
    ],
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "​smtp.gmail.com​",
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
    await transporter.sendMail(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

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
      subject: "Pertanyaan Terkait HackAttack via WEB",
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

export async function sendBroadcast() {
  const broadCastTemplate = fs.readFileSync(
    path.join(process.cwd(), "public", "email-template", "broadcast.html"),
    "utf8"
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "​smtp.gmail.com​",
    port: 587,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const unnotifiedEmails = await checkEmailListUnnotified();

  for (const email of unnotifiedEmails) {
    try {
      const message = {
        from: `HackAttack.CCIHimaIF <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "Welcome to HackAttack 2025! 🚀",
        html: broadCastTemplate,
      };

      await transporter.sendMail(message);
      await updateStatusBroadcasted(email);
    } catch (error) {
      console.error("Error sending email: ", error);
      return { success: false, error };
    }
  }
  return { success: true };
}
