import { createClient } from "@supabase/supabase-js";
// import NotifyMe from "@/interface/notifyme";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export const addEmailToNotify = async()
