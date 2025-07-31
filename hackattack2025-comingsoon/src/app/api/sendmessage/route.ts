import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/services/message";

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "Fill out the form",
      });
    }

    const result = await createMessage(email, name, message);
    return NextResponse.json(result, { status: result.success ? 201 : 401 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
