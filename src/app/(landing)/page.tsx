"use client";
import Hero from "@/components/landing/hero/hero";
import Features from "@/components/landing/features/features";
import Cta from "@/components/landing/cta/cta";
import Footer from "@/components/landing/footer/footer";
import { motion } from "motion/react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen text-text-primary relative bg-gradient-to-br from-[#1E293B] via-background to-[#0F172A] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(88, 101, 242, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(88, 101, 242, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <Hero />
      <Features />
      <Cta />
      <Footer />

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </motion.div>
  );
}
