"use client";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import BASE_URL from "@/app/basic_api"; 

export default function FraudCurbChat() {
const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! Welcome to Vizo Bot" },
]);
const [input, setInput] = useState("");
const [isSpeaking, setIsSpeaking] = useState(true);
const [isLoading, setIsLoading] = useState(false);
const chatAreaRef = useRef(null);

const speak = (text) => {
    if (!isSpeaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
};

const scrollToBottom = () => {
    setTimeout(() => {
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, 100);
};

const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    scrollToBottom();

    // Show 3-dot animation
    setIsLoading(true);
    setMessages((prev) => [...prev, { type: "typing", text: "" }]);

    try {
    const res = await fetch(`${BASE_URL}/vizobot/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    const botMessage = data.reply;

    let i = 0;
    let currentText = "";

    const interval = setInterval(() => {
        currentText += botMessage[i];
        i++;
        if (i === botMessage.length) clearInterval(interval);

        setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.type === "typing") {
            updated[updated.length - 1].text = currentText;
        } else {
            updated.push({ type: "typing", text: currentText });
        }
        return updated;
        });

        scrollToBottom();
    }, 30);

    speak(botMessage);
    } catch (error) {
    console.error("Failed to fetch:", error);
    } finally {
    setIsLoading(false);
    }
};

const handleKeyDown = (e) => {
    if (e.key === "Enter") {
    if (e.shiftKey) {
        // allow newline
        return;
    } else {
        e.preventDefault();
        sendMessage();
    }
    }
};

return (
    <div className="w-full h-screen flex justify-center items-center">
    <div className="w-full h-full bg-white flex flex-col shadow-2xl bg-grid-pattern overflow-hidden">
        {/* Navbar */}
        <div className="bg-gradient-to-r from-[#3a6186] to-[#89253e] p-5 text-white flex justify-between items-center">
        <div className="flex items-center space-x-4">
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
            {/* <div className="w-10 h-10 bg-white/20 rounded-full mr-4 relative overflow-hidden">
            <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-white rounded-full"></div>
            </div> */}
            <span className="text-[22px] font-semibold">Vizo Bot</span>
        </div>
        <button
            className="ml-auto text-white"
            onClick={() => setIsSpeaking((prev) => !prev)}
            title={isSpeaking ? "Disable speech" : "Enable speech"}
        >
            🎙️ {isSpeaking ? "On" : "Off"}
        </button>
        </div>

        {/* Chat Area */}
        <div
        ref={chatAreaRef}
        className="flex-1 p-5 overflow-y-auto flex flex-col bg-[radial-gradient(circle_at_25px_25px,rgba(0,0,0,0.05)_2%,transparent_0%),radial-gradient(circle_at_75px_75px,rgba(0,0,0,0.05)_2%,transparent_0%)] bg-[length:100px_100px]"
        >
        {messages.map((msg, idx) => (
            <div
            key={idx}
            className={`relative max-w-[70%] mb-4 ${
                msg.type === "user" ? "self-end" : "self-start"
            }`}
            >
            {(msg.type === "bot" || msg.type === "typing") && (
                <div className="flex justify-between items-center mb-1">
                <span className="text-lg">🤖</span>
                <button
                    className="text-xs text-gray-500 hover:text-gray-800"
                    onClick={() => navigator.clipboard.writeText(msg.text)}
                >
                    📋 Copy
                </button>
                </div>
            )}
            <div
                className={`px-4 py-3 rounded-[18px] shadow-md animate-fadeIn ${
                msg.type === "user"
                    ? "bg-gradient-to-br from-[#3a6186] to-[#89253e] text-white rounded-br-[5px]"
                    : "bg-[#f0f0f0] rounded-bl-[5px]"
                }`}
            >
                {msg.type === "typing" && msg.text === "" && isLoading ? (
                <div className="flex space-x-1 animate-pulse">
                    <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0s]"></div>
                    <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="dot w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                ) : (
                // msg.text
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
                )}
            </div>
            </div>
        ))}
        </div>

        {/* Input Area */}
        <div className="flex mb-10 mx-10 mr-30 ml-30 items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <textarea
            rows="1"
            className="flex-1 scrollbar-hide resize-none py-2 px-4 bg-transparent text-[16px] outline-none placeholder-gray-400 text-gray-700"
            placeholder="Typing a message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
        ></textarea>
        <button
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3a6186] to-[#89253e] text-white flex items-center justify-center ml-2 hover:scale-105 transition-transform"
            onClick={sendMessage}
        >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
        </button>
        </div>
    </div>

    <style jsx>{`
        .dot {
        animation: bounce 0.6s infinite ease-in-out alternate;
        }
        @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-6px);
        }
        }
        .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }
        .scrollbar-hide::-webkit-scrollbar {
        display: none;
        }
        .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
        }
        .bg-grid-pattern {
        background-image: linear-gradient(rgba(226, 232, 240, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(226, 232, 240, 0.4) 1px, transparent 1px);
        background-size: 20px 20px;
        }
    `}</style>
    </div>
);
}
