"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
const userId = localStorage.getItem("Omni_Ai_Id");
setIsLoggedIn(!!userId);
}, []);

useEffect(() => {
const handleResize = () => {
    if (window.innerWidth >= 768) {
    setMenuOpen(false); // Auto close when switching to desktop
    }
};

window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);

const handleLogout = () => {
localStorage.removeItem("Omni_Ai_Id");
setIsLoggedIn(false);
};

const navLinks = ["Home", "Features", "Advance", "Services", "Contact"];

return (
<>
    <nav className="fixed top-0 w-full backdrop-blur bg-[#0F172A]/80 border-b border-[#334155] shadow-md z-50">
    <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Image
        src="https://trontek.com/front/images/lgs-new.png"
        alt="Omni AI Hub"
        className="h-8"
        width={50}
        height={50}
        unoptimized
        />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
            <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[#94A3B8] hover:text-white relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-purple-500 after:to-transparent after:opacity-0 hover:after:opacity-100 transition-all"
            >
            {link}
            </a>
        ))}
        </div>

        {/* Desktop Login/Logout Button */}
        <div className="hidden md:flex gap-4">
        {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className="w-[111px] h-[41px] rounded-[15px] cursor-pointer transition duration-300 ease-in-out
                bg-gradient-to-br from-red-500 to-transparent bg-opacity-20 
                flex items-center justify-center hover:bg-opacity-70 
                hover:shadow-[0_0_10px_rgba(255,0,0,0.5)] focus:outline-none"
            >
            <div className="w-[107px] h-[37px] text-sm rounded-[13px] bg-[#1a1a1a] text-white font-semibold flex items-center justify-center gap-[15px]">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[13px] h-[13px] fill-white"
                viewBox="0 0 24 24"
                >
                <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 19H11v-2h9V7h-9V5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z" />
                </svg>
                <p>Log Out</p>
            </div>
            </button>
        ) : (
            <Link
            href="/login"
            className="w-[111px] h-[41px] rounded-[15px] cursor-pointer transition duration-300 ease-in-out
                bg-gradient-to-br from-[#2e8eff] to-transparent bg-opacity-20 
                flex items-center justify-center hover:bg-opacity-70 
                hover:shadow-[0_0_10px_rgba(46,142,255,0.5)] focus:outline-none"
            >
            <div className="w-[107px] h-[37px] text-sm rounded-[13px] bg-[#1a1a1a] text-white font-semibold flex items-center justify-center gap-[15px]">
                <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-[13px] h-[13px] fill-white"
                >
                <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
                </svg>
                <p>Log In</p>
            </div>
            </Link>
        )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#94A3B8] hover:text-white focus:outline-none"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            {menuOpen ? (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
            ) : (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
            )}
        </svg>
        </button>
    </div>
    </nav>

    {/* Mobile Dropdown */}
    {menuOpen && (
    <div className="fixed top-16 left-0 w-full z-40 backdrop-blur-xl">
        <div className="w-full bg-[#1e293b] px-6 py-6 shadow-[0_80px_140px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4">
        {navLinks.map((link) => (
            <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            className="text-[#94A3B8] hover:text-white text-lg transition"
            >
            {link}
            </a>
        ))}
        {isLoggedIn ? (
            <button
            onClick={() => {
                handleLogout();
                setMenuOpen(false);
            }}
            className="mt-2 w-full max-w-xs text-center py-2 rounded-[13px] bg-[#1a1a1a] text-white font-semibold hover:bg-opacity-80 shadow"
            >
            Log Out
            </button>
        ) : (
            <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full max-w-xs text-center py-2 rounded-[13px] bg-[#1a1a1a] text-white font-semibold hover:bg-opacity-80 shadow"
            >
            Log In
            </Link>
        )}
        </div>
    </div>
    )}
</>
);
}
