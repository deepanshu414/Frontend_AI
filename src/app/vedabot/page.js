"use client";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import BASE_URL from "@/app/basic_api"; 

export default function VedaBotChat() {
// Function to get the current time
const getCurrentTime = () => {
const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12;
return `${hours}:${minutes} ${ampm}`;
};

const [messages, setMessages] = useState([
{ type: "system", text: "👋 Welcome to VedaBot! How can I assist you today?", time: getCurrentTime() },
]);
const [input, setInput] = useState("");
const [isTyping, setIsTyping] = useState(false);
const [micEnabled, setMicEnabled] = useState(true);
const chatRef = useRef(null);
const containerRef = useRef(null);

useEffect(() => {
chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [messages, isTyping]);

const speakText = (text) => {
if (!micEnabled || typeof window === "undefined") return;
const utterance = new SpeechSynthesisUtterance(text);
window.speechSynthesis.speak(utterance);
};

const sendMessage = async () => {
if (!input.trim()) return;

const userMessage = { type: "user", text: input.trim(), time: getCurrentTime() };
setMessages(prev => [...prev, userMessage]);
setInput("");
setIsTyping(true);

try {
    const response = await fetch(`${BASE_URL}/veda_bot/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input.trim() }),
    });

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    const botText = data.response;
    // const confidenceScore = data.score ?? null; // ✅ Extract score if available

    // console.log("Confidence Score:", confidenceScore); // ✅ Optional

    animateBotMessage(botText);
} catch {
    animateBotMessage("⚠️ Sorry, I couldn't reach the server. Please try again.");
    // animateBotMessage(`${botText}${confidenceScore !== null ? ` (score: ${confidenceScore.toFixed(2)})` : ""}`);
}
};

const animateBotMessage = (text) => {
const words = text.split(" ");
let currentText = "";
setIsTyping(true);

let i = 0;
const interval = setInterval(() => {
    currentText += (i > 0 ? " " : "") + words[i];
    i++;

    if (i === 1) {
    setMessages(prev => [...prev, { type: "system", text: currentText, time: getCurrentTime() }]);
    } else {
    setMessages(prev => {
        const last = [...prev];
        last[last.length - 1].text = currentText;
        return last;
    });
    }

    if (i >= words.length) {
    clearInterval(interval);
    setIsTyping(false);
    speakText(text);
    }
}, 100);
};

const handleKeyDown = (e) => {
if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
}
};

const handleMouseMove = (e) => {
const container = containerRef.current;
const x = (e.clientX / window.innerWidth - 0.5) * 2;
const y = (e.clientY / window.innerHeight - 0.5) * 2;
container.style.transform = `rotateX(${3 - y}deg) rotateY(${x}deg)`;
};

const copyToClipboard = (text) => {
navigator.clipboard.writeText(text);
};

return (
<div
    onMouseMove={handleMouseMove}
    className="w-full h-screen bg-gradient-to-br from-[#f6f9fc] to-[#eef1f5] flex justify-center items-center overflow-hidden"
>
    <div
    ref={containerRef}
    className="w-[100%] h-[100%] bg-white shadow-2xl flex flex-col overflow-hidden relative transition-all duration-500"
    >
    {/* Glowing Border */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#4776E6] via-[#8E54E9] to-[#4776E6] rounded-[22px] opacity-70 blur-md -z-10"></div>

    {/* Header */}
    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-[#4776E6] to-[#8E54E9] text-white shadow-md relative z-10">
        <div className="flex items-center gap-4">
            <button
                onClick={() => window.location.href = "/"}
                className="text-white text-2xl hover:text-gray-200"
                title="Go back"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                >
                <path d="M10 19l-7-7 7-7v4h8v6h-8v4z" />
                </svg>
            </button>
        {/* <div className="w-10 h-10 rounded-full bg-white relative">
            <div className="absolute inset-0 animate-spin bg-gradient-to-tr from-white/10 to-white/20 rounded-full"></div>
        </div> */}
        <h1 className="text-2xl font-bold tracking-wide">VedaBot</h1>
        </div>
        <div className="flex gap-2 items-center">
        <button
            onClick={() => setMicEnabled(prev => !prev)}
            className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition text-sm"
            title={micEnabled ? "Disable Voice" : "Enable Voice"}
        >
            {micEnabled ? "🔊 Mic On" : "🔇 Mic Off"}
        </button>
        </div>
    </div>
    {/* Chat Messages */}
<div ref={chatRef} className="flex-1 overflow-y-auto p-6 flex flex-col bg-white space-y-6">
        {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
            className={`relative max-w-[70%] p-4 text-sm rounded-2xl ${
                msg.type === "user"
                ? "ml-auto bg-gradient-to-br from-[#4776E6] to-[#8E54E9] text-white"
                : "bg-gradient-to-br from-[#f6f9fc] to-[#e9edf5] text-gray-700"
            }`}
            >
            <div
                className={`absolute -top-5 text-xs text-gray-500 ${
                msg.type === "user" ? "right-3" : "left-3"
                }`}
            >
                {msg.type === "user" ? "You" : "System"}
            </div>

            {msg.text === "..." ? (
                <div className="flex space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                </div>
            ) : (
                <>
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
                                
                {msg.type === "system" && (
                <button
                onClick={() => copyToClipboard(msg.text)}
                className="absolute top-[-25] right-2 text-xs bg-white/50 hover:bg-white text-gray-700 px-2 py-1 rounded"
                >
                📋
                </button>
            )}

                </>
            )}
            <div className="text-[10px] text-gray-400 mt-1 text-right">{msg.time}</div>
            </div>
        </div>
        ))}
    </div>
    
    

    {/* Input Area */}
    <div className="flex items-center p-5 border-t border-gray-200 bg-white relative">
        <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-4 rounded-xl bg-[#f6f9fc] focus:bg-white outline-none text-sm shadow-inner resize-none"
        placeholder="Type your message here..."
        />
        <button
        onClick={sendMessage}
        className="w-12 h-12 ml-3 rounded-full bg-gradient-to-br from-[#4776E6] to-[#8E54E9] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
        >
        <div className="relative w-5 h-5">
            <div className="absolute w-4 h-[2px] bg-white rotate-45 top-2 left-0"></div>
            <div className="absolute w-4 h-[2px] bg-white -rotate-45 top-2 left-0"></div>
        </div>
        </button>
    </div>
    </div>
</div>
);
}
