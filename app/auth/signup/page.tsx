"use client";

import { account, ID } from "@/lib/appwrite";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const name = useAuthStore((state) => state.name);
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const setName = useAuthStore((state) => state.setName);
  const setLoggedInUser = useAuthStore((state) => state.setLoggedInUser);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);

  async function signup(name: string, email: string, password: string) {
    setIsAuthenticating(true);
    try {
      const user = await account.create(ID.unique(), email, password, name);
      setLoggedInUser(user);
      
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="relative z-10 w-full max-w-md px-8 py-12 bg-white/3 backdrop-blur-xl shadow-2xl">
        <div className="mb-10 text-center">
          <h3 className="text-lg tracking-wide text-zinc-300">Create your account</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Join Harmony Care Hospital to book appointments, track your medical
            records, and receive personalized healthcare — anytime, anywhere.
          </p>
        </div>

        <div className="flex flex-col gap-5 overflow-hidden">
          <input
            type="text"
            name="name"
            className="px-2 py-1 focus:outline-none border-b-1 border-zinc-600 focus:border-blue-500"
            placeholder="Name"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            className="px-2 py-1 focus:outline-none border-b-1 border-zinc-600  focus:border-blue-500"
            placeholder="Email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="px-2 py-1 focus:outline-none border-b-1 border-zinc-600  focus:border-blue-500"
            placeholder="Password"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => signup(name ?? "", email ?? "", password ?? "")}
            className="relative group overflow-hidden p-3 rounded-xl"
          >
            {!isAuthenticating ? <span className="relative z-10">Signup</span> : <span className="animate-pulse relative z-10">Signing up ...</span>}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;
