import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default function Home() {
    async function joinRoom(formData) {
        "use server";
        const prisma = new PrismaClient();
        const roomId = formData.get("roomId");
        const room = await prisma.conversation.findFirst({
            where: {
                id: roomId,
            },
        });
        if (!room) {
            return;
        }
        redirect(`/room/${room.id}`);
    }

    async function CreateRoom() {
        "use server";
        const prisma = new PrismaClient();
        const newRoom = await prisma.conversation.create({});
        if (!newRoom) {
            return;
        }
        redirect(`/room/${newRoom.id}`);
    }
    return (
        <div className="w-[80%] mx-auto">
            <div className="my-2 font-semibold">join or create a room</div>
            <form action={joinRoom} className="flex space-x-3">
                <input
                    type="text"
                    placeholder="enter room id"
                    name="roomId"
                    className="focus:outline-none p-1 text-black rounded-sm"
                />
                <button
                    type="submit"
                    className="bg-white text-black px-2 font-medium rounded-sm"
                >
                    join
                </button>
            </form>
            <div className="mt-2">or</div>
            <div className="flex my-2">
                <form action={CreateRoom}>
                    <button
                        type="submit"
                        className="bg-white text-black px-2 font-medium rounded-sm"
                    >
                        create room
                    </button>
                </form>
            </div>
        </div>
    );
}
