import { NextRequest, NextResponse } from "next/server";
import { insertEmail } from "@/lib/services/notification";

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required",
      });
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing CAPTCHA token" },
        { status: 400 }
      );
    }

    const secret = process.env.CAPTCHA_SECRET_KEY;
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const captchaRes = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await captchaRes.json();

    if (!data.success || (data.score !== undefined && data.score < 0.5)) {
      return NextResponse.json(
        { success: false, message: "CAPTCHA verification failed" },
        { status: 403 }
      );
    }

    const result = await insertEmail(email);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
