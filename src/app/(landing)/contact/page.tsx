"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="p-8 font-sans text-center text-neutral-200">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-neutral-300">Email: thealiasapp@gmail.com</p>
        <p className="text-neutral-300">Discord: amg00</p>
      </motion.div>
    </main>
  );
}
