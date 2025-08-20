"use client";

import React, { useState } from "react";
import { account } from "@/lib/appwrite";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);

  const setLoggedInUser = useAuthStore((state) => state.setLoggedInUser);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function login(email: string, password: string) {
    setIsAuthenticating(true);
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
      router.push("/medical-info")
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Card container */}
      <div className="relative z-10 w-full max-w-md px-8 py-12 bg-white/3 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h3 className="text-lg tracking-wide text-zinc-300">
            Welcome back to
          </h3>
          <h1 className="mt-2 text-4xl font-bold tracking-tight uppercase text-blue-400 drop-shadow-lg">
            Harmony Care
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Login to continue your health journey with us
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 text-sm text-white bg-transparent border-b border-zinc-600 focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-500"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 text-sm text-white bg-transparent border-b border-zinc-600 focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-500"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={() => login(email ?? "", password ?? "")}
            className="relative w-full px-4 py-3 text-sm font-semibold tracking-wide uppercase rounded-xl overflow-hidden group"
          >
            {!isAuthenticating ? <span className="relative z-10 transition-colors group-hover:text-white">
              Login
            </span> : <span className="animate-pulse relative z-10">Logging you in ...</span>}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Page;

{
  /* <>
 <div>
          <h3>Create your patient profile</h3>
          <p>Fill in your personal and medical details to get started</p>
        </div>
        <textarea className="form-chat-container resize-none hover:border-blue-500 focus:ring-blue-500 border-1 border-white max-w-7xl w-lg h-25 rounded-2xl"></textarea>
        <Send className="absolute right-0 bottom-0 size-10 bg-blue-500 rounded-tl-2xl cursor-pointer hover:bg-pink-500/50 transition-colors duration-1000 ease-out p-2 text-white" />
</> */
}
