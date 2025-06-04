"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Finisher_background from '@/animations/Finisher_background';
import { db } from "@/app/FirebaseConfig";
import { getDocs, query, where ,collection, addDoc} from "firebase/firestore";

async function addlogintoFirestore(email_check, password_check) {
    try {
        const q = query(
        collection(db, "users"),
        where("email", "==", email_check),
        where("password", "==", password_check)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id; // return first matching user ID
        } else {
        return false;
        }
    } catch (error) {
        console.error("Error login: ", error);
        return false;
    }
}



async function addsignintoFirestore(name, email, password) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
        timestamp: new Date(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error signin: ", error);
        return false;
    }
}


export default function LoginPage() {
    const router = useRouter();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [email_check, setEmail_Check] = useState("");
const [password_check, setPassword_Check] = useState("");
const [isSignup, setIsSignup] = useState(false);
const [prevIsSignup, setPrevIsSignup] = useState(false);
const [showForgotPassword, setShowForgotPassword] = useState(false);

const handleSubmit_l = async (e) => {
    e.preventDefault();
    const docId = await addlogintoFirestore(email_check, password_check);
    if (docId) {
        localStorage.setItem("Omni_Ai_Id", docId);
        router.push("/");

        setEmail_Check("");
        setPassword_Check("");
    } else {
        alert("Invalid email or password!");
    }
};

const handleSubmit_s = async (e) => {
    e.preventDefault();
    const docId = await addsignintoFirestore(name, email, password);
    if (docId) {
        localStorage.setItem("Omni_Ai_Id", docId);
        router.push("/");
        setName("");
        setEmail("");
        setPassword("");
        setIsSignup(false); // optionally switch to login
    } else {
        alert("Signup failed!");
    }
};


useEffect(() => {
setPrevIsSignup(isSignup);
}, [isSignup]);

const getAnimationProps = () => {
if (!prevIsSignup && isSignup) {
    return {
    initial: { x: -300, y: -100, opacity: 0 },
    exit: { x: 300, y: -100, opacity: 0 },
    };
} else if (prevIsSignup && !isSignup) {
    return {
    initial: { x: 300, y: 100, opacity: 0 },
    exit: { x: -300, y: 100, opacity: 0 },
    };
} else {
    return {
    initial: { x: 0, y: 0, opacity: 0 },
    exit: { x: 0, y: 0, opacity: 0 },
    };
}
};

const { initial, exit } = getAnimationProps();

return (
<div className="w-full h-screen flex items-center justify-center bg-[#0F172A] font-sans px-4 sm:px-6">
    
    <div className="relative z-10 flex w-full h-full rounded-2xl shadow-2xl bg-[#0f172ad3] transition-all duration-700 items-center justify-center">
    <Finisher_background variant="bg2" />
    <AnimatePresence mode="wait">
        <motion.div
        key={isSignup ? "signup-right" : "login-right"}
        initial={initial}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={exit}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="flex items-center justify-center w-full md:w-1/2 max-w-md h-auto bg-[#1E293BCC] backdrop-blur-md p-8 rounded-xl"
        >
            
        <div className="w-full">
            <h2 className="text-center text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            {isSignup ? "Create Account" : "Login"}
            </h2>

            <form className="space-y-4" onSubmit={isSignup ? handleSubmit_s : handleSubmit_l}>
            {isSignup && (
                <div>
                <label className="text-sm text-gray-400 mb-1 block">
                    Full Name
                </label>
                <div className="relative">
                    <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A80] border border-[#334155] focus:outline-none focus:border-purple-500 text-white"
                    />
                </div>
                </div>
            )}
            <div>
                <label className="text-sm text-gray-400 mb-1 block">
                Email Address
                </label>
                <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                    type="email"
                    value={isSignup ? email : email_check}
                    onChange={(e) =>
                        isSignup ? setEmail(e.target.value) : setEmail_Check(e.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A80] border border-[#334155] focus:outline-none focus:border-purple-500 text-white"
                />
                
                </div>
            </div>
            <div>
                <label className="text-sm text-gray-400 mb-1 block">
                Password
                </label>
                <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={isSignup ? password : password_check}
                    onChange={(e) =>
                        isSignup ? setPassword(e.target.value) : setPassword_Check(e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F172A80] border border-[#334155] focus:outline-none focus:border-purple-500 text-white"
                />
                </div>
            </div>

            {!isSignup && (
                <div className="flex justify-between items-center text-sm">
                <span></span>
                <button
                onClick={() => router.push("/")}
                className="text-purple-400 text-sm hover:text-pink-400  transition transform translate-x-[-120px]"
                title="Go back"
            >
                Back
            </button>
                <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-purple-400 hover:text-pink-400"
                >
                    Forgot Password?
                </button>
                </div>
            )}

            <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 text-white font-medium hover:-translate-y-1 hover:shadow-xl transition-all"
            >
                {isSignup ? "Create Account" : "Login"}
            </button>

            
            </form>

            <div className="text-center mt-6 text-sm text-gray-400">
            {isSignup ? (
                <>
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-purple-400 hover:text-pink-400 font-semibold transition"
                >
                    Login
                </button>
                </>
            ) : (
                <>
                {/* Google Auth Button */}
            {/* <div className="text-center">
                <button
                type="button"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-gray-600 bg-[#0F172A80] hover:bg-[#0F172ABB] text-white transition mb-5"
                >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Continue with Google
                </button>
            </div> */}
            Create new account?{" "}
                <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="text-purple-400 hover:text-pink-400 font-semibold transition "
                >
                Sign up
                </button>
                </>
            )}
            
            
            </div>
        </div>
        </motion.div>
    </AnimatePresence>

    {/* Forgot Password Modal */}
    {showForgotPassword && (
        <div className="absolute inset-0 bg-[#0f172a] bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-[#1E293B] text-white p-6 rounded-xl w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-center text-purple-400">Reset Password</h3>
            <p className="text-sm mb-4 text-gray-300 text-center">
            Enter your email to receive password reset instructions.
            </p>
            <input
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-[#0F172A80] border border-[#334155] focus:outline-none focus:border-purple-500 text-white"
            />
            <div className="flex justify-end gap-2">
            <button
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 text-sm rounded-lg text-gray-300 hover:text-white"
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-400 text-sm rounded-lg text-white hover:shadow-lg"
            >
                Send Email
            </button>
            </div>
        </div>
        </div>
    )}
    </div>
</div>
);
}
