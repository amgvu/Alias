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
    <div className="min-h-screen bg-background text-text-primary  mt-10 md:mt-30  justify-start p-8 sm:p-30">
      <main className="w-full max-w-[1400px] mx-auto">
        <div className="gap-6 ">
          <div className=" gap-4 flex flex-col items-center md:col-span-2">
            <h1 className="text-text-primary text-center font-gintoNord  text-4xl md:text-7xl">
              <TextEffect per="char" speedReveal={3} delay={0.1}>
                Automating the busywork of Discord community management
              </TextEffect>
            </h1>
            <div className="text-text-secondary text-center flex flex-col items-center font-ginto md:translate-x-0  text-2xl md:text-4xl space-y-4">
              <div className="text-sm md:text-xl md:w-1/2">
                <TextEffect per="line" speedReveal={1} delay={1}>
                  Arclify sets dynamic nicknames, personalizes identities, and
                  streamlines community workflows. Make Discord management
                  faster, smarter, and more expressive.
                </TextEffect>
              </div>
            </div>
            <div className="md:inline-flex ">
              <motion.button
                onClick={handleSignUpClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="cursor-pointer border border-border-subtle font-medium text-text-primary font-ginto text-sm md:text-base bg-button px-6 py-3 rounded-lg shadow-md hover:bg-button-hover transition duration-300"
              >
                Join the early access waitlist
              </motion.button>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap justify-center"></footer>
    </div>
  );
}
