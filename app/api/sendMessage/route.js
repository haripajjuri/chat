import { pusherServer } from "@/app/lib/pusherObj";

export async function POST(req) {
    const { msg, roomId } = await req.json();
    pusherServer.trigger(`${roomId}`, "incoming-message", msg);
    return new Response({ success: "true" });
}
