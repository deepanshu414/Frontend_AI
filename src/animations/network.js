"use client";

import { useEffect, useRef, useState } from "react";

const VantaBackground = () => {
const vantaRef = useRef(null);
const [vantaEffect, setVantaEffect] = useState(null);

useEffect(() => {
let threeScript, vantaScript;

const loadScriptsAndInit = () => {
    if (typeof window === "undefined" || vantaEffect || !vantaRef.current) return;

    threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    threeScript.async = true;

    vantaScript = document.createElement("script");
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
    vantaScript.async = true;

    document.body.appendChild(threeScript);
    document.body.appendChild(vantaScript);

    vantaScript.onload = () => {
    if (window.VANTA && window.THREE) {
        const effect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xff3cac, // Pink
        backgroundColor: 0x1f1f1f, // Deep dark
        points: 14.0,
        maxDistance: 22.0,
        spacing: 17.0,
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

export default VantaBackground;
