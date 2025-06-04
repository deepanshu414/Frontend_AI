"use client";
import { useEffect ,useMemo , useState} from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF ,Center} from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import Finisher_background from '../animations/Finisher_background';
import { db } from "@/app/FirebaseConfig";
import { collection , addDoc } from "firebase/firestore";


async function addDatatoFirestore(name,email,phoneno,message){
    try{
        const docRef = await addDoc(collection(db,"messages"),{
            name:name,
            email:email,
            phoneno:phoneno,
            message:message,
        });
        // console.log("Document written with ID: ",docRef.id);
        return true;
    }
    catch (error){
        console.error("Error adding document ",error);
        return false;
    }
}

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



export default function Contact() {   
    const [name,setName] = useState("");
    const [email,setEmail]= useState("");
    const [phoneno,setPhoneno]=useState("");
    const [message,setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const added = await addDatatoFirestore(name,email,phoneno,message);
        if (added) {
            setName("");
            setEmail("");
            setPhoneno("");
            setMessage("");
        }
    }
    return (
        <>
        {/* Contact Section */}
        <section className="py-24 bg-[#0F172A] relative overflow-hidden" id="contact">
            <Finisher_background variant="bg1" />
        <div className=" relative z-10 container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-[#94A3B8] max-w-md mx-auto">
                Ready to transform your business? Reach out to our team of AI experts.
            </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Smaller Contact Form */}
            <div className="relative max-w-md mx-auto custom-outline-wrapper">
                <form onSubmit={handleSubmit} className="space-y-4 bg-[#0F172A] p-6 rounded-[14px] relative z-10">
                    <input type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-[#414141] focus:border-[#e81cff] p-3 rounded-md text-white placeholder-[#94A3B8] focus:outline-none focus:ring-[1px] focus:ring-[#e81cff]"
                    placeholder="Full Name"
                    required
                    />
                    <input type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-[#414141] focus:border-[#e81cff] p-3 rounded-md text-white placeholder-[#94A3B8] focus:outline-none focus:ring-[1px] focus:ring-[#e81cff]"
                    placeholder="Email"
                    required
                    />
                    <input type="tel"
                    id="phoneno"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                    className="w-full bg-transparent border border-[#414141] focus:border-[#e81cff] p-3 rounded-md text-white placeholder-[#94A3B8] focus:outline-none focus:ring-[1px] focus:ring-[#e81cff]"
                    placeholder="Phone Number"
                    required
                    />
                    <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full bg-transparent border border-[#414141] focus:border-[#e81cff] p-3 rounded-md text-white placeholder-[#94A3B8] resize-none focus:outline-none focus:ring-[1px] focus:ring-[#e81cff]"
                    placeholder="Message"
                    required
                    ></textarea>
                    <input type ="submit" value="Send" className=" transition delay-10 duration-100  w-full bg-[#1E293B] hover:bg-[#325793] hover:text-white text-white py-3 rounded-md font-medium transition-all duration-200 border border-[#414141]" />
                </form>
            </div>




            {/* 3D Folder Model */}
            <div className=" bg-gradient-to-br from-[#0f172a] from-[30%] to-white/20 w-full max-w-md h-[400px] mx-auto flex items-center justify-center rounded-xl shadow-lg">
                
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
            </div>
        </div>
        </section>

        </>
    );
}