"use client";

import { motion } from "motion/react";
import {
  landingContainerVariants,
  landingItemVariants,
} from "@/lib/data/framer-variants";
import { useAuth } from "@/lib/hooks";
import { FaDiscord, FaUsers, FaRocket, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const floatingIconVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const { handleDiscordLogin } = useAuth();

  return (
    <motion.main
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={landingContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#5865F2]/20 to-[#8B5CF6]/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#EC4899]/20 to-[#F59E0B]/20 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-[#00D4AA]/20 to-[#5865F2]/20 rounded-full blur-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      <motion.div
        className="absolute top-32 left-1/4 text-[#5865F2]/30 hidden md:block"
        variants={floatingIconVariants}
        animate="animate"
      >
        <FaUsers size={40} />
      </motion.div>

      <motion.div
        className="absolute top-1/4 right-1/4 text-[#EC4899]/30 hidden md:block"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      >
        <FaRocket size={35} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/6 text-[#00D4AA]/30 hidden lg:block"
        variants={floatingIconVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <FaHeart size={30} />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={landingItemVariants} className="mb-8">
          <motion.h1 className="font-gintoNord text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Alias
          </motion.h1>
          <motion.div
            className="h-2 w-32 mx-auto mt-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #5865F2, #8B5CF6, #EC4899, #F59E0B, #00D4AA)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>
        <motion.p
          variants={landingItemVariants}
          className="font-ginto text-2xl sm:text-3xl md:text-4xl text-text-primary mb-6 font-semibold"
        >
          World&apos;s First Discord Nicknames Manager
        </motion.p>
        <motion.p
          variants={landingItemVariants}
          className="font-ginto text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
        >
          The ultimate Discord nickname manager that brings your community
          together with
          <span className="text-[#5865F2] font-semibold">
            {" "}
            intelligent themes
          </span>
          ,
          <span className="text-[#EC4899] font-semibold"> bulk operations</span>
          , and
          <span className="text-[#00D4AA] font-semibold">
            {" "}
            seamless automation
          </span>
          .
        </motion.p>
        <motion.div variants={landingItemVariants} className="mb-16">
          <Button
            onClick={handleDiscordLogin}
            className="group relative overflow-hidden px-12 py-6 text-xl font-ginto font-bold rounded-2xl border-0 shadow-2xl transform transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)",
              color: "white",
            }}
          >
            <span className="relative z-10 flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaDiscord className="w-7 h-7" />
              </motion.div>
              Get Started Free
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </motion.div>
      </div>
    </motion.main>
  );
}
