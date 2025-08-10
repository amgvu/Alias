import { motion } from "motion/react";
import { FaRocket, FaBolt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks";

export default function Cta() {
  const { handleDiscordLogin } = useAuth();

  return (
    <section className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, #5865F2 0%, #19175C 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full blur-2xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, #FF4CD2 0%, #381F2C 70%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background:
              "radial-gradient(circle, #35ED7E 0%, #002920 70%, transparent 100%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.05, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(25, 23, 92, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)",
            border: "1px solid rgba(88, 101, 242, 0.3)",
            boxShadow:
              "0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(224, 227, 255, 0.1)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(88, 101, 242, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(88, 101, 242, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="relative z-10 p-16 text-center">
            <motion.div
              className="flex justify-center mb-12"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, #5865F2 0%, #FF4CD2 50%, #35ED7E 100%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className="relative p-8 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #19175C 0%, #5865F2 100%)",
                    border: "1px solid #E0E3FF",
                    boxShadow:
                      "0 0 40px rgba(88, 101, 242, 0.5), inset 0 1px 0 rgba(224, 227, 255, 0.2)",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <FaRocket className="w-16 h-16 text-text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.h3
              className="font-gintoNord text-5xl sm:text-6xl md:text-7xl font-black mb-8 uppercase tracking-tight"
              style={{
                background: "linear-gradient(135deg, #E0E3FF 0%, #5865F2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
                lineHeight: "0.9",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              TRANSFORM YOUR DISCORD SERVER
            </motion.h3>
            <motion.p
              className="font-ginto text-2xl text-[#E0E3FF]/90 mb-4 font-medium"
              style={{ lineHeight: "1.4" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join the Future of Discord Community Management
            </motion.p>
            <motion.p
              className="font-ginto text-lg text-[#E0E3FF]/70 mb-12 max-w-4xl mx-auto font-medium"
              style={{ lineHeight: "1.4" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Experience the Power of Automated Nickname Management Designed
              Specifically for Discord Communities.
              <span className="text-[#5865F2] font-semibold mx-2">
                Start Free Today
              </span>
              and See the Difference Intelligent Automation Makes.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { text: "✨ Instant Setup", color: "#5865F2" },
                { text: "⚡ Lightning Fast", color: "#FF4CD2" },
                { text: "🔒 Secure & Private", color: "#35ED7E" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="px-6 py-3 rounded-xl font-ginto font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}05 100%)`,
                    border: `1px solid ${feature.color}30`,
                    color: feature.color,
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Button
                onClick={handleDiscordLogin}
                className="group cursor-pointer relative overflow-hidden px-20 py-8 text-2xl font-ginto font-bold rounded-3xl border-0 transform transition-all duration-300 hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, #5865F2 0%, #19175C 100%)",
                  color: "white",
                  boxShadow:
                    "0 20px 60px rgba(88, 101, 242, 0.4), inset 0 1px 0 rgba(224, 227, 255, 0.1)",
                }}
              >
                <span className="relative z-10 flex items-center gap-6">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaBolt className="w-10 h-10" />
                  </motion.div>
                  Start Your Journey
                </span>
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(224, 227, 255, 0.2) 0%, transparent 100%)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              </Button>
            </motion.div>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <p className="font-ginto text-sm text-[#E0E3FF]/50 mb-4 font-medium">
                Trusted by Discord Communities Worldwide • Free to Start
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
