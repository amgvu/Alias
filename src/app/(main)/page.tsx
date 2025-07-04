"use client";
import { TextEffect } from "@/components/ui/Animations/text-effect";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const handleSignUpClick = () => {
    window.open(
      "https://app.youform.com/forms/uwk5hpox",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-background text-text-primary mt-10 md:mt-30 justify-start p-8 sm:p-30">
      <main className="w-full max-w-[1400px] mx-auto">
        <div className="gap-6">
          <div className="gap-4 flex flex-col items-center md:col-span-2">
            <h1 className="text-text-primary text-center font-gintoNord text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              <TextEffect per="char" speedReveal={3} delay={0.1}>
                The nickname manager you never knew you wanted
              </TextEffect>
            </h1>
            <div className="text-text-secondary text-center flex flex-col items-center font-ginto text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl space-y-4">
              <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[20px] md:w-1/2">
                <TextEffect per="line" speedReveal={1} delay={1}>
                  Arclify lets you set dynamic nicknames, personalize
                  identities, and speed up community workflows. Make Discord
                  management faster, smarter, and a lot more fun.
                </TextEffect>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="md:inline-flex"
            >
              <button
                onClick={handleSignUpClick}
                className="cursor-pointer border border-border-subtle font-medium text-text-primary font-ginto text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] bg-button px-6 py-3 rounded-lg shadow-md hover:bg-button-hover transition duration-300"
              >
                Join the early access waitlist
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      <div className="h-96 md:h-[65rem]"></div>
      <footer className="w-full max-w-[1400px] mx-auto">
        <Separator className="mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
          <div className="text-text-secondary text-xs sm:text-sm md:text-base">
            © 2025 Arclify. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs sm:text-sm md:text-base">
            <a
              href="/legal/privacy-policy"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/legal/terms-of-service"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
