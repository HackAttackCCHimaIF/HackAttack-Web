import { NextRequest, NextResponse } from "next/server";
import { sendBroadcast } from "@/lib/config/email";

export async function POST(req: NextRequest) {
  // check secret cron job
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const today = new Date();
  const startDate = new Date("2025-09-27");
  const endDate = new Date("2025-10-27");

  // sendBroadcast if date is between 27 September 2025 and 27 October
  if (today >= startDate && today <= endDate) {
    const result = await sendBroadcast();
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } else {
    return NextResponse.json(
      { success: false, message: "Not 27 September 2025 yet" },
      { status: 400 }
    );
  }
}
