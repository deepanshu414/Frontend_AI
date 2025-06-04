"use client";
import Image from "next/image";
function FooterColumn({ title, links , className = "" }) {
    return (
        <div className={className}>
        <h4 className="font-semibold mb-4">{title}</h4>
        <ul className="space-y-2 text-[#94A3B8]">
            {links.map(link => (
            <li key={link.name}>
                <a href={link.url} className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
                {link.name}
                </a>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default function Footer() {   
    return (
        <>
        {/* Footer */}
    <footer className="py-12 border-t border-[#334155]">
    <div className="container mx-auto px-4 grid md:col-cols-1 gap-10">
        <div>
        <Image
            src="https://trontek.com/front/images/lgs-new.png"
            alt="Omni AI Hub"
            className="h-8 mb-4"
            width={50} 
            height={50} 
            unoptimized 
        />
        <p className="text-[#94A3B8]">Shaping tomorrow with intelligent, secure, and unified AI solutions.</p>
        </div >

        <FooterColumn
        title="Company"
        links={[
            { name: "About", url: "https://trontek.com/page/about-us" },
            { name: "Careers", url: "https://www.crunchbase.com/organization/trontek-electronics-private-limited" },
                { name: "Blog", url: "https://www.tofler.in/trontek-electronics-private-limited/company/U27101DL2006PLC154820" },
            ]}
            className="md:col-start-3"
            />

            <FooterColumn
            title="Connect"
            links={[
                { name: "Twitter", url: "https://x.com/trontek_battery" },
                { name: "LinkedIn", url: "https://www.linkedin.com/company/trontek/?originalSubdomain=in" },
                { name: "GitHub", url: "https://github.com/deepanshu414/Frontend_AI" },
            ]}
            className="md:col-start-4 col-start-3"
            />
        </div>

        <p className="text-center text-[#94A3B8] mt-8">© 2025 Omni AI Hub. All rights reserved.</p>
    </footer>
        </>
    );
}