"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/app/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Firestore function
async function addDatatoFirestore(name, email, complain) {
try {
await addDoc(collection(db, "complained"), {
    name,
    email,
    complain,
    timestamp: new Date(),
});
return true;
} catch (error) {
console.error("Error adding document: ", error);
return false;
}
}

export default function ComplaintBox() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [complain, setComplain] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
const added = await addDatatoFirestore(name, email, complain);
if (added) {
    setName("");
    setEmail("");
    setComplain("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // auto hide after 3 sec
}
};

return (
<div className="min-h-screen bg-gradient-to-br from-slate-700 via-blue-800 to-indigo-800 flex items-center justify-center p-4">
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-lg"
    >
    <div className="rounded-2xl shadow-2xl bg-slate-100/90 backdrop-blur p-6">
    
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
            <button
                onClick={() => window.location.href = "/"}
                className="text-white text-2xl hover:text-gray-200 transform translate-x-[-120px]"
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
        Complaint Box
        </h1>
        {submitted && (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-700 font-semibold text-center mb-4"
        >
            Complaint submitted successfully!
        </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-slate-800">
            Company Name
            </label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter company name"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-800">
            Email
            </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your email"
            required
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-800">
            Complaint
            </label>
            <textarea
            value={complain}
            onChange={(e) => setComplain(e.target.value)}
            rows="5"
            className="mt-1 w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Write your complaint here..."
            required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-xl transition-colors"
        >
            Submit Complaint
        </button>
        </form>
    </div>
    </motion.div>
</div>
);
}
