import { pusherServer } from "@/app/lib/pusherObj";

export async function POST(req) {
    const { msg, roomId } = await req.json();
    console.log("msg :" + msg);
    console.log("roomId :" + roomId);

    await pusherServer.trigger(roomId, "incoming-message", msg);

    return new Response(JSON.stringify({ success: "true" }));
}
