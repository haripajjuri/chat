"use client";
import axios from "axios";

import { useState } from "react";

export default function MessageField({ roomId }) {
    async function sendMessage() {
        await axios.post("/api/sendMessage", { msg, roomId });
    }
    
    const [msg, setMsg] = useState("");

    return (
        <div className="flex gap-3">
            <input
                type="text"
                placeholder="enter your message"
                name="text"
                onChange={(e) => {
                    setMsg(e.target.value);
                }}
                className="text-black"
            />

            <button
                onClick={() => sendMessage()}
                className="px-2 bg-white text-black rounded-sm"
            >
                send
            </button>
        </div>
    );
}
