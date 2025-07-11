"use server";

import nodemailer from "nodemailer";

export async function sendWelcomeEmail(email: string) {
  const message = {
    from: `HackAttack.CCIHimaIF <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Welcome to HackAttack 2025! 🚀",
    html: `<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to HackAttack2025</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div
      style="
        background: linear-gradient(135deg, #01a850, #047a3c);
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 30px;
      "
    >
      <h1 style="color: white; margin: 0; font-size: 28px">
        🚀 HackAttack2025
      </h1>
      <p style="color: #e8f5e8; margin: 10px 0 0 0; font-size: 16px">
        The Ultimate Hackathon Experience
      </p>
    </div>

    <div
      style="
        background: #f9f9f9;
        padding: 25px;
        border-radius: 8px;
        margin-bottom: 25px;
      "
    >
      <h2 style="color: #01a850; margin-top: 0">Thank you for subscribing! 🎉</h2>
      <p>We're thrilled to have you join the HackAttack2025 community!</p>
      <p>You'll be the first to know when:</p>
      <ul style="color: #555">
        <li>Registration opens</li>
        <li>Event details are announced</li>
        <li>Sponsor prizes are revealed</li>
        <li>Workshop schedules are released</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0">
      <p style="font-size: 18px; color: #01a850; font-weight: bold">
        Get ready for an amazing hackathon experience!
      </p>
    </div>

    <div
      style="
        border-top: 1px solid #eee;
        padding-top: 20px;
        text-align: center;
        color: #666;
        font-size: 14px;
      "
    >
      <p>A collaboration between HIMA IF and CCI Summit</p>
      <p>
        Follow us for updates:
        <a href="https://www.instagram.com/hackattack.ccihimaif?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" style="color: #01a850">@hackattack.ccihimaif</a>
      </p>
    </div>
  </body>
</html>`,
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
