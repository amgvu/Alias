"use client";

import { TextEffect } from "@/components/ui/Animations/text-effect";
import { motion } from "framer-motion";

export default function Home() {
  const handleSignUpClick = () => {
    window.open(
      "https://app.youform.com/forms/uwk5hpox",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col mt-10 md:mt-30 items-center justify-start p-8 sm:p-30">
      <main className="w-full max-w-[1400px] mx-auto">
        <div className="gap-6 items-center">
          <div className="flex flex-col gap-4 items-center md:col-span-2">
            <h1 className="text-zinc-100 font-gintoNord text-center text-4xl md:text-7xl">
              <TextEffect per="char" speedReveal={3} delay={0.1}>
                Automating the busywork of Discord community management
              </TextEffect>
            </h1>
            <div className="text-zinc-300 text-center font-ginto md:translate-x-0 translate-x-5 text-2xl md:text-4xl space-y-4">
              <div className="text-sm text-center md:text-xl max-w-3/4 mx-7 md:mx-auto">
                <TextEffect per="line" speedReveal={1} delay={1}>
                  Arclify sets dynamic nicknames, personalizes identities, and
                  streamlines community workflows. Make Discord management
                  faster, smarter, and more expressive.
                </TextEffect>
              </div>
            </div>
            <div className="md:inline-flex items-center">
              <motion.button
                onClick={handleSignUpClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="cursor-pointer font-medium text-black font-ginto text-sm md:text-base bg-zinc-100 px-6 py-3 rounded-lg shadow-md hover:bg-neutral-400 transition duration-300"
              >
                Join the early access waitlist
              </motion.button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
