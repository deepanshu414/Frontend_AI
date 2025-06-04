"use client";
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Advance from "@/components/Advance";
import Aisolution from "@/components/Aisolution";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loadpage from "@/animations/loadpage";

export default function OmniAIHub() { 
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
    // Wait until page is fully loaded
    const handleLoad = () => setIsLoading(false);

    // If already loaded
    if (document.readyState === "complete") {
        handleLoad();
    } else {
        // Listen for load
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
    }
    }, []);

    if (isLoading) {
    return (
        <div className="relative min-h-screen w-screen overflow-hidden">
        <Loadpage />
        </div>
    );
    }

    return (
    <div className="relative min-h-screen bg-[#0F172A] text-[#F1F5F9] font-serif overflow-x-hidden">
        <Navbar />
        <Hero />
        <Features />
        <Advance />
        <Aisolution />
        <Contact />
        <Footer />
    </div>
    );
}



