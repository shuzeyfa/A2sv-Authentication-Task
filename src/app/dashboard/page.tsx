"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";



export default function Dashboard() {
  const router = useRouter();
  const {data: session, status} = useSession();
  if (status === "loading"){
     return <p className="text-center text-gray-400 mt-32">Loading...</p>;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, <span className="text-[#4640DE]">{session?.user?.name}</span> 👋
      </h1>
      <p className="text-gray-600 mt-2">
        You are now logged in. Enjoy your dashboard!
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
