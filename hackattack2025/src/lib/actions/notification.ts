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
    console.log("insertEmail called with:", email);

    console.log("Testing Supabase connection...");
    const { error: testError } = await supabase
      .from("notifyme")
      .select("count", { count: "exact", head: true });

    if (testError) {
      console.error("Supabase connection test failed:", testError);
      return {
        success: false,
        message: "Database connection failed",
        error: testError.message,
      };
    }

    console.log("Supabase connection successful");

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
      console.error("Supabase insert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return {
        success: false,
        message: "Something went wrong. Please try again (Insert Email).",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    sendWelcomeEmail(email).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

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
