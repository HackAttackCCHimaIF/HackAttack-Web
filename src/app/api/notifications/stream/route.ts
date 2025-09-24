import { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/config/supabase-server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return new Response("User email is required", { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseServer
    .from("Users")
    .select("id")
    .eq("email", userEmail)
    .single();

  if (userError || !userData) {
    return new Response("User not found", { status: 404 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`)
      );

      const subscription = supabaseServer
        .channel(`notifications_${userData.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "Notification",
            filter: `user_id=eq.${userData.id}`,
          },
          (payload) => {
            console.log("SSE notification event:", payload);

            try {
              let eventData;

              if (payload.eventType === "INSERT") {
                eventData = {
                  type: "notification_created",
                  data: {
                    ...payload.new,
                    read: payload.new.is_read,
                  },
                };
              } else if (payload.eventType === "UPDATE") {
                eventData = {
                  type: "notification_updated",
                  data: {
                    ...payload.new,
                    read: payload.new.is_read,
                  },
                };
              } else if (payload.eventType === "DELETE") {
                eventData = {
                  type: "notification_deleted",
                  data: { id: payload.old.id },
                };
              }

              if (eventData) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(eventData)}\n\n`)
                );
              }
            } catch (error) {
              console.error("Error processing SSE event:", error);
            }
          }
        )
        .subscribe((status) => {
          console.log("SSE subscription status:", status);

          if (status === "SUBSCRIBED") {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "subscribed" })}\n\n`
              )
            );
          }
        });

      return () => {
        console.log("Cleaning up SSE subscription");
        supabaseServer.removeChannel(subscription);
      };
    },
    cancel() {
      console.log("SSE stream cancelled");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  });
}
