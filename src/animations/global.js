"use client";
import { useEffect, useRef, useState } from "react";

const VantaGlobe = () => {
const vantaRef = useRef(null);
const [vantaEffect, setVantaEffect] = useState(null);

useEffect(() => {
let threeScript;
let vantaScript;

const loadScriptsAndInit = async () => {
    if (typeof window !== "undefined" && !vantaEffect && vantaRef.current) {
    threeScript = document.createElement("script");
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js";
    threeScript.async = true;

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
            scale: 1.0,
            scaleMobile: 1.0,
        });
        setVantaEffect(effect);
        }
    };
    }
};

loadScriptsAndInit();

return () => {
    if (vantaEffect) vantaEffect.destroy();
    if (threeScript) document.body.removeChild(threeScript);
    if (vantaScript) document.body.removeChild(vantaScript);
};
}, [vantaEffect]);

return <div ref={vantaRef} className="w-full h-screen" />;
};

export default VantaGlobe;
