import { supabase } from "@/lib/config/supabase";
import Message from "@/interface/message";
import { sendMessage } from "@/lib/config/email";

export interface MessageResponse {
  success: boolean;
  message: string;
  data?: Message;
  error?: string;
}

export async function createMessage(
  email: string,
  name: string,
  message: string
): Promise<MessageResponse> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
      error: "Invalid email format",
    };
  }

  if (!name || !message) {
    return {
      success: false,
      message: "Please enter your name or message",
      error: "Empty name or message",
    };
  }

  try {
    const { data, error } = await supabase
      .from("message")
      .insert([{ email, name, message }])
      .select()
      .single();

    if (error) {
      console.error("Supabase message insert error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return {
        success: false,
        message: "Something went wrong. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    try {
      const emailResult = await sendMessage(email, name, message);

      if (!emailResult.success) {
        console.error("Email sending failed:", emailResult.error);
        return {
          success: false,
          message:
            "Message saved but email notification failed. We'll still review your message.",
          data,
          error: "Email sending failed",
        };
      }

      console.log("Message sent successfully:", emailResult);
      return {
        success: true,
        message: "Success! Message sent and email notification delivered.",
        data,
      };
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return {
        success: false,
        message:
          "Message saved but email notification failed. We'll still review your message.",
        data,
        error: emailError instanceof Error ? emailError.message : "Email error",
      };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "Can't send message. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
