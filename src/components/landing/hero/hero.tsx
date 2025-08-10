"use client";

import { motion } from "motion/react";
import {
  landingContainerVariants,
  landingItemVariants,
} from "@/lib/data/framer-variants";
import { useAuth } from "@/lib/hooks";
import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { handleDiscordLogin } = useAuth();

  return (
    <motion.main
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      variants={landingContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, #5865F2 0%, #19175C 70%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, #FF4CD2 0%, #381F2C 70%, transparent 100%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/2 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, #35ED7E 0%, #002920 70%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div variants={landingItemVariants} className="mb-12">
          <motion.div className="flex items-center justify-center gap-4 mb-8">
            <motion.h1 className="font-gintoNord text-text-primary text-7xl sm:text-8xl md:text-9xl font-black tracking-tight uppercase">
              ALIAS
            </motion.h1>
          </motion.div>
          <motion.div
            className="h-1 w-48 mx-auto rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #19175C 0%, #5865F2 50%, #E0E3FF 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
          />
        </motion.div>
        <motion.div variants={landingItemVariants} className="mb-8">
          <h2
            className="font-gintoNord text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 uppercase tracking-tight"
            style={{ letterSpacing: "-0.03em", lineHeight: "0.9" }}
          >
            DISCORD NICKNAME MANAGEMENT
          </h2>
          <p
            className="font-ginto text-xl text-[#E0E3FF] opacity-90 font-medium"
            style={{ lineHeight: "1.4" }}
          >
            The World&apos;s First Discord Nicknames Manager
          </p>
        </motion.div>
        <motion.div variants={landingItemVariants} className="mb-12">
          <p
            className="font-ginto text-lg text-[#E0E3FF]/80 max-w-5xl mx-auto font-medium"
            style={{ lineHeight: "1.4" }}
          >
            Transform Your Discord Server with
            <span className="text-[#5865F2] font-semibold mx-2 px-3 py-1 bg-[#5865F2]/10 rounded-lg">
              Intelligent Themes
            </span>
            <span className="text-[#FF4CD2] font-semibold mx-2 px-3 py-1 bg-[#FF4CD2]/10 rounded-lg">
              Bulk Operations
            </span>
            and
            <span className="text-[#35ED7E] font-semibold mx-2 px-3 py-1 bg-[#35ED7E]/10 rounded-lg">
              Seamless Automation
            </span>
          </p>
        </motion.div>
        <motion.div variants={landingItemVariants}>
          <Button
            onClick={handleDiscordLogin}
            className="group relative overflow-hidden px-16 py-8 text-2xl font-ginto font-bold rounded-3xl border-0 transform transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #5865F2 0%, #19175C 100%)",
              color: "white",
              boxShadow:
                "0 20px 40px rgba(88, 101, 242, 0.3), inset 0 1px 0 rgba(224, 227, 255, 0.1)",
            }}
          >
            <span className="relative z-10 flex text-text-primary items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
              >
                <FaDiscord className="w-8 h-8" />
              </motion.div>
              Get Started Now
            </span>
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(224, 227, 255, 0.2) 0%, transparent 100%)",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            />
          </Button>
        </motion.div>
        <motion.div variants={landingItemVariants} className="mt-16">
          <p className="font-ginto text-sm text-[#E0E3FF]/60 mb-4 font-medium">
            Trusted by Discord Communities Worldwide
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}
