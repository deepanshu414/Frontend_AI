"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Aisolution() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const omniId = localStorage.getItem("Omni_Ai_Id");
        setIsLoggedIn(!!omniId); // true if Omni_Ai_Id exists
    }, []);

    const handleAccess = (path) => {
        if (isLoggedIn) {
        router.push(path); // go to the correct route
        } else {
        router.push("/login"); // redirect to login if not logged in
        }
    };

    const features = [

            {
                title: "VidaBot",
                description:
                "A secure, encrypted chatbot facilitating real-time conversation between doctors, patients, and users for healthcare and consultation purposes.",
                path: "/vedabot",
            },
            {
                title: "Vizo Bot",
                description:
                "An intelligent chatbot designed to answer questions, provide AI-based guidance, and support general task automation across domains.",
                path: "/vizobot",
            },
            {
                title: "NeuronixLife",
                description:
                "A smart healthcare assistant that collects patient symptoms, provides primary medical suggestions, and logs interactions on the blockchain.",
                path: "/neuronixlife",
            },
            {
                title: "Excel Work",
                description:
                "A tool for uploading Excel files, filtering data, modifying cell ranges, and exporting processed sheets—powered by AI automation.",
                path: "/excel_work",
            },
            {
                title: "User Complained Box",
                description:
                "A decentralized complaint system allowing users to securely submit and track issues using a blockchain-backed AI interface.",
                path: "/complained",
            }
            

    ];

    return (
        <section id="services" className="py-24 bg-[#1E293B]/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our AI Solutions</h2>
            <p className="text-[#94A3B8] max-w-md mx-auto">
                Explore our specialized AI-powered assistants and systems
            </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature) => (
                <div
                key={feature.title}
                className="p-8 shadow-xl shadow-indigo-500/50 bg-[#1E293B]/70 border border-[#334155] rounded-xl hover:border-purple-500 hover:-translate-y-2 transition"
                >
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-[#94A3B8] mb-6">{feature.description}</p>
                <button
                    onClick={() => handleAccess(feature.path)}
                    className="group relative cursor-pointer border-b-[4px] border-l-[4px] border-r-[4px] border-t-0 border-[#161616] transition-all duration-300 shadow-[0_4px_10px_#00000062,0_10px_40px_-10px_#000000a6,0_12px_45px_-15px_#00000071] active:shadow-none"
                >
                    <div className="flex items-center gap-3 border-b-[3px] border-[#374e72] bg-gradient-to-b from-[#5771a5] to-black px-[20px] py-[2px] text-m font-semibold text-purple-300 tracking-wider shadow-[1px_1px_0px_#000,0_0_9px_#fff]">
                    Explore
                    </div>
                </button>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
