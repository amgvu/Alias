"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="p-8 font-sans text-center pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <h1 className="text-3xl text-text-primary font-bold mb-2">WIP</h1>
      </motion.div>
    </main>
  );
}
