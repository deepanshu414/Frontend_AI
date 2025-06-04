"use client";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";

const getCurrentTime = () => {
const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, "0");
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12;
return `${hours}:${minutes} ${ampm}`;
};

export default function JobFitAIChat() {
const [messages, setMessages] = useState([
{ type: "bot", text: "👋 Hey there! Welcome to JobFit AI!", time: getCurrentTime() }
]);
const [input, setInput] = useState("");
const [isSpeaking, setIsSpeaking] = useState(true);
const [waitingForResponse, setWaitingForResponse] = useState(false);
const chatRef = useRef(null);
const containerRef = useRef(null);

useEffect(() => {
chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [messages, waitingForResponse]);

const speak = (text) => {
if (!isSpeaking) return;
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = "en-US";
speechSynthesis.speak(utterance);
};

const handleCopy = (text) => {
navigator.clipboard.writeText(text);
};

const sendMessage = async () => {
if (!input.trim()) return;

const userMessage = { type: "user", text: input.trim(), time: getCurrentTime() };
setMessages((prev) => [...prev, userMessage]);
setInput("");
setWaitingForResponse(true);

const botPlaceholder = { type: "bot", text: "...", time: getCurrentTime() };
setMessages((prev) => [...prev, botPlaceholder]);

try {
    const response = await fetch("http://127.0.0.1:8000/api/job_fit/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input.trim() }),
    });

    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    const botText = data.reply || "🤖 Sorry, I couldn't understand that.";

    const words = botText.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
    currentIndex++;
    const currentText = words.slice(0, currentIndex).join(" ");

    setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: "bot", text: currentText, time: getCurrentTime() };
        return updated;
    });

    if (currentIndex === words.length) {
        clearInterval(interval);
        setWaitingForResponse(false);
        speak(botText);
    }
    }, 300);  // 300 ms per word (adjust speed here)
    // Optional delay for realism

} catch (error) {
    setTimeout(() => {
    setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
        type: "bot",
        text: "🤖 Oops! Server not responding.",
        time: getCurrentTime()
        };
        return updated;
    });
    setWaitingForResponse(false);
    }, 1500);
}
};

const handleKeyDown = (e) => {
if (e.key === "Enter") {
    if (e.shiftKey) {
    e.preventDefault();
    setInput(input + "\n");
    } else {
    e.preventDefault();
    sendMessage();
    }
}
};

return (
<div className="w-full h-screen bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb] flex justify-center items-center overflow-hidden">
    <div
    ref={containerRef}
    className="w-full h-full bg-white/95 shadow-2xl flex flex-col overflow-hidden"
    >
    {/* Header */}
    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white">
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
        <div className="w-10 h-10 bg-white/30 rounded-full relative flex items-center justify-center shadow-inner">
            <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
        <h1 className="text-2xl font-semibold tracking-wide">JobFit AI</h1>
        </div>
        <button
        onClick={() => setIsSpeaking(!isSpeaking)}
        className="text-white bg-white/20 hover:bg-white/30 rounded-full p-2"
        title={isSpeaking ? "Disable Voice" : "Enable Voice"}
        >
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            {isSpeaking ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5v14m0 0l7-7m-7 7l-7-7" />
            ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728" />
            )}
        </svg>
        </button>
    </div>

    {/* Security Notice */}
    <div className="text-center text-xs text-gray-600 bg-gray-100 py-2 border-b border-gray-200">
        Chat session started. Your data is secure.
    </div>

    {/* Chat Area */}
    <div ref={chatRef} className="flex-1 overflow-y-auto p-6 flex flex-col bg-cover space-y-6">
        {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
            className={`relative max-w-[70%] p-4 text-sm rounded-2xl ${
                msg.type === "user"
                ? "bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white rounded-br-md"
                : "bg-[#e9f5ff] text-[#1c2b46] rounded-bl-md shadow-md"
            }`}
            >
            <div
                className={`absolute -top-5 text-xs text-gray-500 ${
                msg.type === "user" ? "right-3" : "left-3"
                }`}
            >
                {msg.type === "user" ? "You" : "JobFit"}
            </div>

            {msg.text === "..." ? (
                <div className="flex space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
                </div>
            ) : (
                <>
                {msg.text}
                {msg.type === "bot" && (
                <button
                    onClick={async () => {
                    await navigator.clipboard.writeText(<ReactMarkdown
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
                                        </ReactMarkdown>);
                    }}
                    className="absolute top-1 right-1 text-[10px] bg-white/70 px-1 rounded hover:bg-white"
                    title="Copy"
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
    <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <textarea
        rows={1}
        className="flex-1 resize-none rounded-full py-3 px-5 bg-gray-100 border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        ></textarea>
        <button
        onClick={sendMessage}
        className="ml-3 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white shadow-lg hover:scale-110 transform transition-transform"
        >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
        </button>
    </div>
    </div>
</div>
);
}
