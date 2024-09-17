"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/app/lib/pusherObj";

export default function Messages({ roomId, initialMessages }) {
    const [incomingMessages, setIncomingMessages] = useState([]);

    useEffect(() => {
        pusherClient.subscribe(roomId);
        pusherClient.bind("incoming-message", (message) => {
            setIncomingMessages((prev) => [...prev, message]);
        });

        return () => {
            pusherClient.unbind_all();
            pusherClient.unsubscribe(roomId);
        };
    }, []);

    return (
        <div>
            {initialMessages.map((message) => (
                <p key={message.id}>{message.text}</p>
            ))}
            {incomingMessages.map((text, i) => (
                <p key={i}>{text}</p>
            ))}
        </div>
    );
}
