import { motion } from "motion/react";
import { FaRocket, FaDiscord, FaStar, FaUsers, FaMagic } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks";

export default function Cta() {
  const { handleDiscordLogin } = useAuth();

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-[#5865F2]/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-[#EC4899]/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background:
              "linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "1px solid rgba(88, 101, 242, 0.2)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="bg-card-background/90 rounded-3xl p-12 text-center backdrop-blur-xl">
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-8 left-8 text-[#5865F2]/40"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaUsers size={24} />
              </motion.div>
              <motion.div
                className="absolute top-12 right-12 text-[#EC4899]/40"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <FaStar size={20} />
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-12 text-[#00D4AA]/40"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <FaMagic size={18} />
              </motion.div>
            </div>

            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5865F2] to-[#EC4899] rounded-3xl blur-xl opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative p-6 rounded-3xl bg-gradient-to-br from-[#5865F2]/20 via-[#EC4899]/20 to-[#00D4AA]/20 backdrop-blur-sm">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <FaRocket className="w-12 h-12 " />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.h3
                className="font-gintoNord text-text-primary text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ready to Transform Your Server?
              </motion.h3>

              <motion.p
                className="font-ginto text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Get an early scoop of Alias&apos;s features and have fun with
                your friends today –
                <span className="text-[#5865F2] font-semibold">
                  {" "}
                  it&apos;s completely free!
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Button
                  onClick={handleDiscordLogin}
                  className="group relative overflow-hidden px-12 py-6 text-2xl font-ginto font-bold rounded-2xl border-0 shadow-2xl transform transition-all duration-300 hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)",
                    color: "white",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-4">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FaDiscord className="w-8 h-8" />
                    </motion.div>
                    Launch Alias Now
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
