"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import {
  checkEmailListUnnotified,
  updateStatusBroadcasted,
} from "@/lib/actions/notification";

export async function sendWelcomeEmail(email: string) {
  const notifyMeTemplate = fs.readFileSync(
    path.join(process.cwd(), "public", "email-template", "notifyme.html"),
    "utf8"
  );

  const message = {
    from: `HackAttack.CCIHimaIF <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Welcome to HackAttack 2025! 🚀",
    html: notifyMeTemplate,
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
