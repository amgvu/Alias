import { motion } from "motion/react";
import { features } from "@/lib/data/features-landing";

export default function Features() {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(circle, #5865F2 0%, #19175C 70%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(circle, #35ED7E 0%, #002920 70%, transparent 100%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="font-gintoNord text-5xl sm:text-6xl md:text-7xl font-black mb-6 uppercase tracking-tight text-text-primary">
            WHY DISCORD COMMUNITIES CHOOSE ALIAS
          </motion.h2>
          <motion.p
            className="font-ginto text-xl text-[#E0E3FF]/80 max-w-4xl mx-auto font-medium"
            style={{ lineHeight: "1.4" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Built by a Developer Who Understands The Tedium of Managing Discord
            Communities. Experience the Power of Automated Nickname Management.
          </motion.p>
          <motion.div
            className="h-1 w-32 mx-auto mt-8 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #19175C 0%, #5865F2 50%, #E0E3FF 100%)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = [
              { primary: "#5865F2", dark: "#19175C", bg: "#5865F2" },
              { primary: "#FF4CD2", dark: "#381F2C", bg: "#FF4CD2" },
              { primary: "#35ED7E", dark: "#002920", bg: "#35ED7E" },
            ];
            const colorScheme = colors[index];

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className="relative overflow-hidden rounded-3xl p-8 h-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.dark}20 0%, #000000 100%)`,
                    border: `1px solid ${colorScheme.primary}20`,
                    boxShadow: `0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.primary}10 0%, transparent 100%)`,
                      boxShadow: `0 0 60px ${colorScheme.primary}30`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${colorScheme.primary} 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="mb-8 relative"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="inline-flex p-6 rounded-2xl relative"
                        style={{
                          background: `linear-gradient(135deg, ${colorScheme.primary}20 0%, ${colorScheme.dark}40 100%)`,
                          border: `1px solid ${colorScheme.primary}30`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${colorScheme.primary}20`,
                            `0 0 30px ${colorScheme.primary}40`,
                            `0 0 20px ${colorScheme.primary}20`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                      >
                        <IconComponent
                          className="w-10 h-10"
                          style={{ color: colorScheme.primary }}
                        />
                      </motion.div>
                    </motion.div>
                    <motion.h3
                      className="font-gintoNord text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 uppercase tracking-tight"
                      style={{
                        color: "#E0E3FF",
                        background: `linear-gradient(135deg, ${colorScheme.primary} 0%, #E0E3FF 100%)`,
                        WebkitBackgroundClip: "text",
                        letterSpacing: "-0.03em",
                        lineHeight: "0.9",
                      }}
                    >
                      {feature.title.toUpperCase()}
                    </motion.h3>
                    <p
                      className="font-ginto text-[#E0E3FF]/70 text-lg group-hover:text-[#E0E3FF]/90 transition-colors duration-300 font-medium"
                      style={{ lineHeight: "1.4" }}
                    >
                      {feature.description}
                    </p>
                    <motion.div
                      className="absolute bottom-6 right-6 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: colorScheme.primary }}
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
