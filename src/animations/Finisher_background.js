'use client';
import { useEffect } from 'react';

export default function Finisher_background({ variant }) {
    useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/finisher-header.es5.min.js';
    script.async = true;

    script.onload = () => {
        if (window.FinisherHeader && document.getElementById(variant)) {
        if (variant === 'bg1') {
            new window.FinisherHeader({
            target: variant,
            count: 100,
            size: { min: 2, max: 8, pulse: 0 },
            speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.6 } },
            colors: {
                background: '#0f172a',
                particles: ['#fbfcca', '#d7f3fe', '#ffd0a7'],
            },
            blending: 'overlay',
            opacity: { center: 1, edge: 0 },
            skew: 0,
            shapes: ['c'],
            });
        } else if (variant === 'bg2') {
            new window.FinisherHeader({
            target: variant,
            count: 90,
            size: { min: 1, max: 20, pulse: 0.1 },
            speed: { x: { min: 0, max: 0.4 }, y: { min: 0, max: 0.1 } },
            colors: {
                background: '#0f172a',
                particles: ['#ffffff', '#87ddfe', '#acaaff', '#1bffc2', '#f88aff'],
            },
            blending: 'screen',
            opacity: { center: 0, edge: 0.4 },
            skew: 0,
            shapes: ['c', 's', 't'],
            });
        }
        }
    };

    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    };
    }, [variant]);

    return (
    <div
        id={variant}
        className="finisher-header absolute inset-0 w-full h-full z-0"
    />
    );
}
