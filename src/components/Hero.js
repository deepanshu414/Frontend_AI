"use client";
import Link from "next/link";
export default function Hero() {

    return(
        <>
        {/* Hero Section */}
        <section id="home" className="relative flex flex-col items-center justify-center text-center min-h-screen pt-24 px-4 overflow-hidden">
            <iframe
                src="https://threejs-galaxy-animation.netlify.app/"
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-auto"
                allowFullScreen
            ></iframe>
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />
            <div className="relative z-20">
            {/* <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"></h1> */}
            <h1 className="text-4xl md:text-6xl font-bold text-gif mb-6">Revolutionizing Intelligent Digital Experiences</h1>
            <p className=" text-[#94A3B8] text-lg mb-10 mr-10 text-center">
            OmniAI Hub brings together intelligent healthcare, educational support, and secure communication into one unified platform—driven by AI and reinforced with blockchain for trust and transparency.
            </p>

            <div className="flex gap-6 justify-center" >
                <Link href="/#services" className="relative shadow-lg shadow-purple-500/40  flex items-center h-11 px-5 pr-14 text-white font-medium text-[17px] tracking-wide bg-[#a370f0] rounded-[0.9em] shadow-[inset_0_0_1.6em_-0.6em_#714da6] overflow-hidden cursor-pointer transition-all duration-300 group">
                    Get started
                    <span className="absolute right-[0.3em] ml-4 flex items-center justify-center h-9 w-9 rounded-[0.7em] bg-white shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] group-active:scale-95">
                        <svg
                        className="w-[1.1em] text-[#7b52b9] transition-transform duration-300 group-hover:translate-x-[0.1em]"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                        </svg>
                    </span>
                </Link>
            </div>
            </div>
        </section>
            
        </>
    );
}