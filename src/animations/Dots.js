// components/VantaDotsBackground.js
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function VantaDotsBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Load VANTA and Three via CDN
    const loadScript = (src) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const initVanta = async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js");

      if (window.VANTA && vantaRef.current) {
        window.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x1e293b,
          color: 0xffffff,
        });
      }
    };

    initVanta();
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0"
      style={{ position: "absolute", width: "100%", height: "100%" }}
    />
  );
}
