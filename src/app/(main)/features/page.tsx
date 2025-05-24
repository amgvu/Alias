"use client";

import { motion } from "framer-motion";

export default function Features() {
  return (
    <main className="p-8 font-sans text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <h1 className="text-3xl text-neutral-200 font-bold mb-2">Intro</h1>
        <p className="text-neutral-300 mb-6 mx-auto mt-2 max-w-4xl">
          Thanks for being interested in using Arclify! This is a platform that
          gives Discord communities a comprehensive suite for managing their
          members&apos; efficiently. Some of the unique features of the app
          include:
        </p>
        <div className="mx-auto w-fit">
          <ul className="text-neutral-300 mb-8 mt-2 text-sm list-disc list-inside text-left">
            <li>Persistent storage for nicknames and nickname collections</li>
            <li>The ability to apply multiple names at once</li>
            <li>
              Generative AI tools for creating thematic nicknames in seconds
            </li>
            <li className="text-neutral-500">
              and many more to come! (mobile friendliness (priority), roles
              management, server monitoring, etc.)
            </li>
          </ul>
        </div>
        <h1 className="text-3xl text-neutral-200 font-bold mb-2">
          Getting Started
        </h1>
        <p className="text-neutral-400 mb-8"></p>
      </motion.div>
    </main>
  );
}
