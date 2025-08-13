import { supabase } from "@/lib/config/supabase";
import Response from "@/lib/types/response";
import Registration from "@/lib/types/registration";

export async function fetchRegistrationData(): Promise<Response> {
  const { data, error } = await supabase
    .from("registration")
    .select(`*, team_id(id, team_name, institution)`);

  if (error) {
    console.error("Error fetching registration:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return {
      success: false,
      message: "Failed fetching registration, please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
  return {
    success: true,
    message: "Success fetching registration",
    data: data as Registration[],
  };
}
