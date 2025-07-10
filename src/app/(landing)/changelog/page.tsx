"use client";

import { motion } from "framer-motion";

export default function ChangeLog() {
  return (
    <main className="p-8 font-sans text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <h1 className="text-3xl text-neutral-200 font-bold mb-2">WIP</h1>
      </motion.div>
    </main>
  );
}
