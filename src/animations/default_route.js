"use client"; // Needed if you're using App Router

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState(null);
  const default_name="http://localhost:8000"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(default_name+"/api/data/"); // or your deployed backend
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <p className="text-center text-sm text-gray-600">
          {data ? `Backend says: ${data.message}` : "Loading..."}
        </p>

        {/* Keep your other UI as it is */}
      </main>
    </div>
  );
}
