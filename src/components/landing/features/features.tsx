import { motion } from "motion/react";
import { features } from "@/lib/data/features-landing";

export default function Features() {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-gintoNord text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Why <span className="text-text-primary">Discord Communities</span>{" "}
            Choose Alias
          </h2>
          <p className="font-ginto text-lg text-text-primary max-w-2xl mx-auto">
            Built by a developer who understand the pain of manual Discord
            management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl bg-card-background/40 backdrop-blur-sm border border-border-subtle hover:border-[#5865F2]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/20 hover:bg-card-background/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-[#5865F2] mb-4 transition-transform duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-gintoNord text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-ginto text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
