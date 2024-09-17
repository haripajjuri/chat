import { PrismaClient } from "@prisma/client";
import Messages from "./messages";
import Pusher from "pusher";

export default async function Room({ params }) {
    const prisma = new PrismaClient();
    const roomId = params.roomId;

    const existingMessages = await prisma.message.findMany({
        where: {
            conversationId: roomId,
        },
    });

    const serializedMessages = existingMessages.map((message) => ({
        text: message.text,
        id: message.id,
    }));

    async function sendMessage(formData) {
        "use server";
        const pusherServer = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: true,
        });
        pusherServer.trigger(
            roomId,
            "incoming-message",
            formData.get("message")
        );
    }
    return (
        <div>
            <div>messages of this room:</div>
            <Messages roomId={roomId} initialMessages={serializedMessages} />
            <form action={sendMessage}>
                <input type="text" placeholder="enter message" name="message" />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
