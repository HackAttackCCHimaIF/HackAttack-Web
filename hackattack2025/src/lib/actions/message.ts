import { supabase } from "@/lib/supabase";
import Message from "@/interface/message";
import { sendMessage } from "@/lib/email";

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

    sendMessage(email, name, message)
      .then((result) => {
        console.log("Message sent successfully:", result);
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
      });

    return {
      success: true,
      message:
        "Success send message, we will reply to your email as soon as possible.",
      data,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      message: "Can't send message. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
