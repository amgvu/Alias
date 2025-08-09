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
      className="relative pt-32 pb-20"
      variants={landingContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="font-gintoNord text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-8"
            variants={landingItemVariants}
          >
            The World&apos;s First
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] via-[#8B5CF6] to-[#EC4899]">
              Discord Nicknames Manager
            </span>
          </motion.h1>

          <motion.p
            className="font-ginto text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8"
            variants={landingItemVariants}
          >
            Alias revolutionizes Discord server management with intelligent
            nickname automation, community themes, and lightning-fast bulk
            operations.
          </motion.p>

          <motion.div variants={landingItemVariants}>
            <Button
              onClick={handleDiscordLogin}
              className="group relative cursor-pointer overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A8] text-white font-ginto font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaDiscord className="w-5 h-5" />
                Try Alias Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
