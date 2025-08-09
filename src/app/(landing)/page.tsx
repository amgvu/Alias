"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks";
import { FaDiscord, FaUsers, FaRocket } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";

export default function Home() {
  const { handleDiscordLogin } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const features = [
    {
      icon: <HiSparkles className="w-6 h-6" />,
      title: "Dynamic Nicknames",
      description:
        "Create themed nickname collections and apply them instantly across your Discord servers.",
    },
    {
      icon: <BsLightning className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Bulk nickname changes in seconds. No more manual editing one by one.",
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Community Focused",
      description:
        "Perfect for events, role-playing servers, and community management.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <motion.main
        className="relative overflow-hidden pt-20 pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2]/10 via-[#8B5CF6]/15 to-[#EC4899]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="font-gintoNord text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-8"
              variants={itemVariants}
            >
              The World&apos;s First
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5865F2] via-[#8B5CF6] to-[#EC4899]">
                Discord Nicknames Manager
              </span>
            </motion.h1>

            <motion.p
              className="font-ginto text-xl sm:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
              variants={itemVariants}
            >
              Alias revolutionizes Discord server management with intelligent
              nickname automation, community themes, and lightning-fast bulk
              operations.
            </motion.p>

            <motion.div variants={itemVariants}>
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
      <section className="py-24 bg-gradient-to-b from-transparent to-[#8B5CF6]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-gintoNord text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Why Discord Communities Choose Alias
            </h2>
            <p className="font-ginto text-lg text-text-secondary max-w-2xl mx-auto">
              Built by a developer who understand the pain of manual Discord
              management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-card-background to-card-background/50 border border-border-subtle hover:border-[#5865F2]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-[#5865F2] mb-4  transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-gintoNord text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-ginto text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5865F2]/15 to-[#EC4899]/20 border border-border-subtle p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/8 to-[#8B5CF6]/15" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#5865F2]/20 to-[#8B5CF6]/25">
                  <FaRocket className="w-8 h-8 text-[#5865F2]" />
                </div>
              </div>
              <h3 className="font-gintoNord text-3xl font-bold text-text-primary mb-4">
                Ready to Transform Your Server?
              </h3>
              <p className="font-ginto text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
                Get an early scoop of Alias&apos;s features and have fun with
                your friends today.
              </p>
              <Button
                onClick={handleDiscordLogin}
                className="group bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A8] text-white font-ginto font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <FaDiscord className="w-5 h-5" />
                  Get Started Free
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <footer className="py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-text-secondary text-sm font-ginto">
              © 2025 Alias. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-ginto">
              <a
                href="/legal/privacy-policy"
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/legal/terms-of-service"
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
