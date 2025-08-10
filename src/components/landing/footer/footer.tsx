import { motion } from "motion/react";
import { FaHeart, FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-32 bg-[#5865F2]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-48 h-24 bg-[#EC4899]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 className="font-gintoNord text-3xl font-bold mb-4">
            Alias
          </motion.h3>
          <p className="font-ginto text-text-secondary max-w-md mx-auto">
            Transforming Discord communities one nickname at a time
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: FaDiscord, color: "#5865F2", label: "Discord" },
            { icon: FaGithub, color: "#333333", label: "GitHub" },
            { icon: FaTwitter, color: "#1DA1F2", label: "Twitter" },
          ].map(({ icon: Icon, color, label }, index) => (
            <motion.a
              key={label}
              href="#"
              className="group relative p-3 rounded-full bg-card-background/40 backdrop-blur-sm border border-border-subtle hover:border-transparent transition-all duration-300"
              whileHover={{
                scale: 1.1,
                borderColor: color,
              }}
              style={{
                boxShadow: `0 0 0 0px ${color}40`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Icon
                className="w-5 h-5 text-text-secondary group-hover:text-white transition-colors duration-300"
                style={{
                  filter: `drop-shadow(0 0 8px ${color}00)`,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: `${color}20` }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          className="border-t border-border-subtle/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              className="flex items-center gap-2 text-text-secondary text-sm font-ginto"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              © 2025 Alias. Built with
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#EC4899", "#FF69B4", "#EC4899"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaHeart className="w-3 h-3" />
              </motion.div>
              for Discord communities.
            </motion.div>
            <motion.div
              className="flex gap-8 text-sm font-ginto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { href: "/legal/privacy-policy", label: "Privacy Policy" },
                { href: "/legal/terms-of-service", label: "Terms of Service" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-text-secondary hover:text-[#5865F2] transition-colors duration-200 relative group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  {label}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-[#5865F2] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
