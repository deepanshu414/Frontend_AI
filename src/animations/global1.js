"use client";

import { useEffect, useRef, useState } from "react";

const VantaGlobeBackground = () => {
const vantaRef = useRef(null);
const [vantaEffect, setVantaEffect] = useState(null);

useEffect(() => {
let threeScript, vantaScript;

const loadScriptsAndInit = () => {
    if (typeof window === "undefined" || vantaEffect || !vantaRef.current) return;

    // Load THREE.js
    threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    threeScript.async = true;

    // Load VANTA.GLOBE
    vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js";
    vantaScript.async = true;

    document.body.appendChild(threeScript);
    document.body.appendChild(vantaScript);

    vantaScript.onload = () => {
    if (window.VANTA && window.THREE) {
        const effect = window.VANTA.GLOBE({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.2,
        scaleMobile: 1.0,
        color: 0x00ffff, // Aqua glow
        color2: 0x2200ff, // Deep blue mesh
        backgroundColor: 0x00010d, // Space black
        size: 1.2,
        });
        setVantaEffect(effect);
    }
    };
};

loadScriptsAndInit();

return () => {
    if (vantaEffect) vantaEffect.destroy();
    if (threeScript) document.body.removeChild(threeScript);
    if (vantaScript) document.body.removeChild(vantaScript);
};
}, [vantaEffect]);

return <div ref={vantaRef} className="w-full h-screen relative z-0" />;
};

export default VantaGlobeBackground;
