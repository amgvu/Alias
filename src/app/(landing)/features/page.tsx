"use client";

import { motion } from "framer-motion";

export default function Features() {
  return (
    <main className="p-8 font-sans text-center pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <h1 className="text-3xl text-neutral-200 font-bold">
          This page is a work in progress (still) but don&apos;t worry, features
          do exist.
        </h1>
      </motion.div>
    </main>
  );
}
