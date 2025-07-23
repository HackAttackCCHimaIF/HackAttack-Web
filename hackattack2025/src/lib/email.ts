"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import {
  checkEmailListUnnotified,
  updateStatusBroadcasted,
} from "@/lib/actions/notification";

export async function sendWelcomeEmail(email: string) {
  let notifyMeTemplate = fs.readFileSync(
    path.join(
      process.cwd(),
      "public",
      "email-template",
      "notifyme-update-white.html"
    ),
    "utf8"
  );

  notifyMeTemplate = notifyMeTemplate.replace("{{email}}", email);

  const message = {
    from: `HackAttack.CCIHimaIF <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "🚀 You’re In! HackAttack2025 Is Now on Your Radar",
    html: notifyMeTemplate,
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
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0F75BD; border-bottom: 2px solid #0F75BD; padding-bottom: 10px;">
            New Message from Website
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #0F75BD; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from the HackAttack website contact form.</p>
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
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
