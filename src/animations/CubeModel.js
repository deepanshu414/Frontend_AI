'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

function Cube() {
const cubeRef = useRef();

useFrame(() => {
if (cubeRef.current) {
    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.x += 0.005;
}
});

return (
<mesh ref={cubeRef} scale={[1.5, 1.5, 1.5]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshPhysicalMaterial
    color="#00aaff"
    metalness={0.9}
    roughness={0.1}
    clearcoat={0.3}
    reflectivity={1}
    />
    <Html distanceFactor={10}>
    </Html>
</mesh>
);
}

export default function CubeModel() {
return (
<Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [2, 2, 4], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Environment preset="sunset" />
    <Cube />
    <OrbitControls enableZoom={false} />
</Canvas>
);
}
