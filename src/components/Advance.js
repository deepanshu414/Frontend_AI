"use client";
import { useEffect ,useMemo} from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Center} from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import Finisher_background from '../animations/Finisher_background';

function FolderModel({ path }) {
    const { scene } = useGLTF(path);

    const clonedScene = useMemo(() => clone(scene), [scene]);

    useEffect(() => {
        clonedScene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
        });
    }, [clonedScene]);

    return (
        <Center>
        <primitive object={clonedScene} />
        </Center>
    );
}



export default function Advance() { 

    return(
        <>
        {/* Advance */}
        <section id="advance" className="py-24 relative overflow-hidden">
            <Finisher_background variant="bg1" />
            <div className="relative z-10 container mx-auto px-4">
                {/* Centered Heading */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Experience AI Like Never Before</h2>
                <p className="text-[#94A3B8]">Our platform combines cutting-edge technology with intuitive design to deliver unprecedented AI capabilities.</p>
                </div>

                {/* Two-column Layout */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="w-full max-w-md h-[400px] bg-gradient-to-b from-[#0f172a]/10% from-[30%] to-white/30 to-[100%] shadow-[0_0_30px_10px_rgba(255,255,255,0.15)] mx-auto flex items-center justify-center rounded-xl shadow-lg">
                    <Canvas
                    shadows
                    camera={{ position: [0, 0, 3], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                    >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[2, 5, 5]} intensity={1.2} castShadow />
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                        <planeGeometry args={[10, 10]} />
                        <shadowMaterial opacity={0.2} />
                    </mesh>
                    <OrbitControls autoRotate enableZoom enablePan={false} />
                    <FolderModel path="/vv.glb" />
                    </Canvas>
                </div>
                <div>
                    <div className="space-y-6">
                    {['Real-time Processing', 'Scalable Solutions', 'Advanced Analytics'].map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                        <i className="fas fa-check-circle text-purple-400 text-xl"></i>
                        <div>
                            <h4 className="font-semibold mb-1">{feature}</h4>
                            <p className="text-[#94A3B8]">
                            {feature === 'Real-time Processing'
                                ? 'Tested response times across AI modules showed minimal latency for input-to-output interactions.'
                                : feature === 'Scalable Solutions'
                                ? 'System modules like VidaBot and Excel Work operated independently, ensuring flexible deployment.'
                                : 'Experimental outputs were evaluated to ensure reliability, accuracy, and practical usability of results.'}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            </section>

        </>
    );
}