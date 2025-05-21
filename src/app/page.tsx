"use client";

import { TextEffect } from "@/components/ui/Animations/text-effect";
import { TextLoop } from "@/components/ui/Animations/text-loop";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [showTextLoop, setShowTextLoop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextLoop(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignUpClick = () => {
    window.open(
      "https://form.typeform.com/to/D6pNxiIe",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] bg-black text-neutral-100 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="font-bold text-9xl">
          <TextEffect per="char" delay={0.1}>
            Arclify
          </TextEffect>
        </h1>

        <div className="text-center text-neutral-200 font-light text-4xl space-y-4">
          <TextEffect per="char" speedReveal={5} delay={0.5}>
            Streamline Your Discord Community. Automate for Expression.
          </TextEffect>

          <div
            className={`transition-opacity font-semibold duration-1000 ${
              showTextLoop ? "opacity-100" : "opacity-0"
            }`}
          >
            <TextLoop
              className="overflow-y-clip text-3xl"
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 5,
              }}
              variants={{
                initial: {
                  y: 20,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -20,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
              }}
            >
              <span>The Sopranos</span>
              <span>Severance</span>
              <span>Harry Potter</span>
              <span>Breaking Bad</span>
              <span>Succession</span>
              <span>Restaurant Chains</span>
              <span>Star Wars</span>
              <span>Game Of Thrones</span>
              <span>DnD</span>
              <span>Cars</span>
            </TextLoop>
            <h3 className="inline-flex whitespace-pre-wrap text-3xl"> arc?</h3>
          </div>
        </div>

        <div className="mt-2 font-[family-name:var(--font-geist-mono)] inline-flex items-center gap-4">
          <h3 className="font-semibold text-neutral-100 text-md">
            <TextEffect delay={1.7}>Join the Closed Beta</TextEffect>
          </h3>
          <motion.button
            onClick={handleSignUpClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            className="cursor-pointer font-semibold text-black bg-neutral-100 px-6 py-3 rounded-lg shadow-md hover:bg-neutral-400 transition duration-300"
          >
            Sign Up
          </motion.button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
