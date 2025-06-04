'use client';

import { useEffect } from 'react';

export default function All_shapes_background() {
useEffect(() => {
const script = document.createElement('script');
script.src = '/js/finisher-header1.es5.min.js'; // Make sure this exists in /public/js
script.async = true;

script.onload = () => {
    if (window.FinisherHeader) {
    new window.FinisherHeader({
        count: 90,
        size: {
        min: 1,
        max: 20,
        pulse: 0.1,
        },
        speed: {
        x: { min: 0, max: 0.4 },
        y: { min: 0, max: 0.1 },
        },
        colors: {
        background: '#0f172a',
        particles: [
            '#ffffff',
            '#87ddfe',
            '#acaaff',
            '#1bffc2',
            '#f88aff',
        ],
        },
        blending: 'screen',
        opacity: {
        center: 0,
        edge: 0.4,
        },
        skew: 0,
        shapes: ['c', 's', 't'],
    });
    }
};

document.body.appendChild(script);
return () => {
    document.body.removeChild(script);
};
}, []);

return <div className="finisher-header absolute inset-0 w-full h-full z-0" />;
}
