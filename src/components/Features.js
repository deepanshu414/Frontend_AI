"use client";
export default function Features() {
    return(
        <>
        {/* Features Section */}
        <section id="features" className="py-24 bg-[#1E293B]/50 ">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Technologies</h2>
            <p className="text-[#94A3B8] max-w-md mx-auto">Empowering OmniAI with intelligent systems for healthcare, communication, education, and automation.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 shadow-cyan-500/50 bg-[#1E293B]/70 border border-[#334155] rounded-xl shadow-md hover:border-purple-500 hover:-translate-y-2 transition floating">
                <h3 className="text-2xl font-bold mb-4">Secure Blockchain Integration</h3>
                <p className="text-[#94A3B8] mb-6">Enhancing data integrity and privacy across user interactions with decentralized blockchain-backed logging and verification.</p>
            </div>
            <div className="p-8 shadow-xl shadow-cyan-500/50 bg-[#1E293B]/70 border border-[#334155] rounded-xl shadow-md hover:border-purple-500 hover:-translate-y-2 transition floating">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Virtual Assistance</h3>
                <p className="text-[#94A3B8] mb-6">Bots like VidaBot and VizoBot use machine learning and NLP to deliver real-time support in tasks, communication, and decision-making.</p>
            </div>
            <div className="p-8 shadow-cyan-500/50 bg-[#1E293B]/70 border border-[#334155] rounded-xl shadow-md hover:border-purple-500 hover:-translate-y-2 transition floating">
                <h3 className="text-2xl font-bold mb-4 ">Modular Smart Services</h3>
                <p className="text-[#94A3B8] mb-6">Specialized tools like NeuronixLife and Excel Work provide domain-specific intelligence—whether in healthcare analysis or automated data processing.</p>
            </div>
            </div>
        </div>
        </section>
        </>
    );
}