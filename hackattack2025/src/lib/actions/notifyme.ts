import { supabase } from "@/lib/supabase";
import NotifyMe from "@/interface/notifyme";
import { sendWelcomeEmail } from "@/lib/email";

export interface NotifyMeResponse {
  success: boolean;
  message: string;
  data?: NotifyMe;
  error?: string;
}

// Insert email to notifyme table
export async function insertEmail(email: string): Promise<NotifyMeResponse> {
  try {
    // Basic email validation
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

    // Insert email into database
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

    // Send welcome email
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

// Get all emails from notifyme table
export async function getAllEmails(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from("notifyme").select("email");

    if (error) {
      console.error("Error fetching emails:", error);
      return [];
    }

    return data.map((item) => item.email);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
}
