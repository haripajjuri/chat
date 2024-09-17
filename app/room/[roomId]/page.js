import { PrismaClient } from "@prisma/client";
import Messages from "./messages";
import MessageField from "./messageField";

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

    return (
        <div>
            <div>messages of this room:</div>
            <Messages roomId={roomId} initialMessages={serializedMessages} />
            {/* <form action={() => sendMessage()}>
                <input type="text" placeholder="enter message" name="message" />
                <button type="submit">submit</button>
            </form> */}
            <MessageField roomId={roomId} />
        </div>
    );
}
