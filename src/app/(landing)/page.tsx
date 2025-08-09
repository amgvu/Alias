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
      className="min-h-screen text-text-primary relative bg-gradient-to-b from-[#5865F2]/20 via-background to-[#1E293B]24"
    >
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </motion.div>
  );
}
