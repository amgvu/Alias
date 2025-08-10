import { motion } from "motion/react";
import { features } from "@/lib/data/features-landing";

export default function Features() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 className="font-gintoNord text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Why Discord Communities Love Alias
          </motion.h2>
          <p className="font-ginto text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Built by a developer who understand the chaos of managing Discord
            communities. Experience the magic of automated nickname management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-card-background/60 via-card-background/40 to-card-background/20 rounded-2xl backdrop-blur-xl" />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA"
                      }20 0%, 
                      transparent 50%, 
                      ${
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA"
                      }20 100%)`,
                  }}
                />

                <div className="relative z-10 p-8">
                  <motion.div
                    className="mb-6 p-4 rounded-full inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA"
                      }20, ${
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA"
                      }10)`,
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent
                      className="w-8 h-8"
                      style={{
                        color:
                          index === 0
                            ? "#5865F2"
                            : index === 1
                            ? "#EC4899"
                            : "#00D4AA",
                      }}
                    />
                  </motion.div>
                  <h3
                    className="font-gintoNord text-2xl font-bold text-text-primary mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA"
                      }, #FFFFFF)`,
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p className="font-ginto text-text-secondary leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  <motion.div
                    className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#5865F2"
                          : index === 1
                          ? "#EC4899"
                          : "#00D4AA",
                    }}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
