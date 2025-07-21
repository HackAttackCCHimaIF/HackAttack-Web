import { supabase } from "@/lib/supabase";
import NotifyMe from "@/interface/notifyme";
import { sendWelcomeEmail } from "@/lib/email";

export interface NotifyMeResponse {
  success: boolean;
  message: string;
  data?: NotifyMe;
  error?: string;
}

export async function insertEmail(email: string): Promise<NotifyMeResponse> {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
        error: "Invalid email format",
      };
    }

    const isDuplicate = await checkEmailDuplicate(email);
    if (isDuplicate) {
      return {
        success: false,
        message: "Email sudah terdaftar",
        error: "Duplicate email",
      };
    }

    const { data, error } = await supabase
      .from("notifyme")
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    const emailResult = await sendWelcomeEmail(email);
    if (!emailResult.success) {
      console.error("Failed to send welcome email:", emailResult.error);
    }

    return {
      success: true,
      message: "Successfully registered for notifications!",
      data,
    };
  } catch (error) {
    console.error("Error inserting email:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function checkEmailDuplicate(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("notifyme")
    .select("email")
    .eq("email", email)
    .single();

  if (!error) {
    if (data.email == email) {
      return true;
    }
  }

  return false;
}

export async function checkEmailListUnnotified() {
  try {
    const { data, error } = await supabase
      .from("notifyme")
      .select("email")
      .eq("is_notified", false);

    if (!error) {
      return data.map((item) => item.email);
    }
  } catch (error) {
    console.error("Error fetching unnotified emails:", error);
  }

  return [];
}

export async function updateStatusBroadcasted(email: string) {
  const { data, error } = await supabase
    .from("notifyme")
    .update({ is_notified: true, updated_at: new Date() })
    .eq("email", email);

  if (error) {
    return {
      success: false,
      message: "Error updating status",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }

  return {
    success: true,
    data,
    message: "Status updated successfully",
  };
}
