"use client";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import BASE_URL from "@/app/basic_api"; 

export default function NeuronixLifeChat() {
const [messages, setMessages] = useState([
{ type: "system", text: "Chat session started. Your health data has been securely loaded." },
{ type: "assistant", text: "Hey, Welcome to your Neuronixlife." },
]);
const [input, setInput] = useState("");
const [isSpeaking, setIsSpeaking] = useState(true);
const chatRef = useRef(null);

useEffect(() => {
chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [messages]);

const getCurrentTime = () => {
const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, "0");
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
return `${hours}:${minutes} ${ampm}`;
};

const handleSpeak = (text) => {
if (!isSpeaking || typeof window === "undefined") return;
const utterance = new SpeechSynthesisUtterance(text);
speechSynthesis.speak(utterance);
};

const fetchAIResponse = async (userText) => {
try {
    const res = await fetch(`${BASE_URL}/neuronixlife/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();
    const aiText = data.reply;

    const assistantMessage = {
    type: "assistant",
    text: aiText,
    time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    handleSpeak(aiText);
} catch (err) {
    console.error("Error fetching AI response", err);
}
};

const sendMessage = () => {
if (!input.trim()) return;
const userMessage = { type: "user", text: input.trim(), time: getCurrentTime() };
setMessages((prev) => [...prev, userMessage]);
fetchAIResponse(input.trim());
setInput("");
};

const handleKeyPress = (e) => {
if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
}
};

return (
<div className="w-full h-screen bg-[#f5f9fc] flex justify-center items-center relative overflow-hidden">
    <div className="w-full h-full bg-white shadow-2xl flex flex-col relative overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center p-5 bg-gradient-to-br from-white to-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-4">
            <button
                onClick={() => window.location.href = "/"}
                className="text-white text-2xl hover:text-gray-200"
                title="Go back"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path d="M10 19l-7-7 7-7v4h8v6h-8v4z" />
                </svg>
            </button>
        {/* <div className="relative w-10 h-10 mr-4">
            <div className="absolute w-full h-full border-4 border-dashed border-[#ff4757] rounded-full animate-spin-slow"></div>
            <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[#2ed573] rounded-full"></div>
        </div> */}
        <span className="text-xl font-semibold text-gray-700">NeuronixLife</span>
        </div>
        <div className="flex gap-3 items-center">
        <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className="px-3 py-2 border border-gray-400 rounded-md text-sm"
            title="Toggle Voice"
        >
            {isSpeaking ? "🎤" : "🔇"}
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100">
            Help
        </button>
        <button className="px-4 py-2 border border-[#ff4757] text-[#ff4757] rounded-md text-sm hover:bg-red-50">
            Emergency
        </button>
        </div>
    </div>

    {/* Chat Area */}
    <div ref={chatRef} className="flex-1 p-5 overflow-y-auto">
        <div className="text-center text-gray-400 text-sm my-4 relative">
        <span className="px-4">Today</span>
        <div className="absolute top-1/2 left-0 w-[35%] border-t border-gray-300"></div>
        <div className="absolute top-1/2 right-0 w-[35%] border-t border-gray-300"></div>
        </div>

        {messages.map((msg, idx) =>
        msg.type === "system" ? (
            <div
            key={idx}
            className="bg-blue-50 text-gray-600 text-xs py-2 px-4 rounded-lg mx-auto text-center mb-6 shadow-sm max-w-[40%]"
            >
            <ReactMarkdown
                                components={{
                                    p: ({ node, ...props }) => <p className="text-base mb-2" {...props} />,
                                    a: ({ node, ...props }) => (
                                    <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
                                    ),
                                    li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                                }}
                                >
                                {msg.text}
                                </ReactMarkdown>
            </div>
        ) : (
            <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} mb-6 relative`}>
            {/* {msg.type === "assistant" && (
                <button
                onClick={async () => {
                    await navigator.clipboard.writeText(msg.text);
                }}
                className="absolute top-1 right-1 text-[10px] bg-white/70 px-1 rounded hover:bg-white"
                title="Copy"
                >
                📋
                </button>
            )} */}
            <div
                className={`max-w-[60%] p-4 rounded-2xl text-sm shadow-md ${
                msg.type === "user"
                    ? "bg-blue-500 text-white rounded-tr-md"
                    : "bg-white text-gray-800 border-l-4 border-green-400 rounded-tl-md"
                }`}
            >
                {msg.type === "assistant" && (
                <div className="text-xs text-gray-400 mb-1">Assistant</div>
                )}
                <div>{msg.text}</div>
            </div>
            {msg.type === "user" && (
                <div className="flex flex-col items-end ml-2">
                <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                </div>
            )}
            </div>
        )
        )}
    </div>

    {/* Input */}
    <div className="flex mb-10 mt-5 items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm mx-20">
        <textarea
        rows="1"
        className="flex-1 resize-none py-2 px-4 rounded-full bg-transparent text-[16px] outline-none placeholder-gray-400 text-gray-700"
        placeholder="Typing a message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        />
        <button
        className="w-8 h-8 rounded-full bg-[#ff3e3e] text-white flex items-center justify-center ml-2 hover:scale-105 transition-transform"
        onClick={sendMessage}
        >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
        </button>
    </div>
    </div>
</div>
);
}
