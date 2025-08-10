import { motion } from "motion/react";
import { FaHeart, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative py-24 overflow-hidden bg-black border-t border-[#5865F2]/20">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full blur-3xl opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, #5865F2 0%, #19175C 50%, transparent 100%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3
              className="font-gintoNord text-3xl font-bold uppercase tracking-tight"
              style={{
                background: "linear-gradient(135deg, #E0E3FF 0%, #5865F2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
                lineHeight: "0.9",
              }}
            >
              ALIAS
            </motion.h3>
          </motion.div>

          <motion.p
            className="font-ginto text-[#E0E3FF]/70 max-w-lg mx-auto font-medium"
            style={{ lineHeight: "1.4" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming Discord Communities with Intelligent Nickname
            Management and Automation.
          </motion.p>
          <motion.div
            className="h-px w-32 mx-auto mt-8 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #5865F2 50%, transparent 100%)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </motion.div>
        <motion.div
          className="flex justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            {
              icon: FaDiscord,
              color: "#5865F2",
              label: "Website",
              href: "#",
            },
            {
              icon: FaGithub,
              color: "#E0E3FF",
              label: "GitHub",
              href: "#",
            },
            {
              icon: FaTwitter,
              color: "#35ED7E",
              label: "Twitter",
              href: "#",
            },
          ].map(({ icon: Icon, color, label, href }, index) => (
            <motion.a
              key={label}
              href={href}
              className="group relative p-4 rounded-2xl transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(88, 101, 242, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)",
                border: "1px solid rgba(88, 101, 242, 0.2)",
              }}
              whileHover={{
                scale: 1.1,
                y: -4,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Icon
                className="w-6 h-6 text-[#E0E3FF]/60 group-hover:text-white transition-colors duration-300"
                style={{
                  filter: `drop-shadow(0 0 10px ${color}00)`,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
                  boxShadow: `0 0 20px ${color}30`,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          className="border-t border-[#5865F2]/20 pt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <motion.div
              className="flex items-center gap-2 text-[#E0E3FF]/60 text-sm font-ginto font-medium"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              © 2025 Alias. Built with
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  color: ["#FF4CD2", "#35ED7E", "#FF4CD2"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaHeart className="w-3 h-3" />
              </motion.div>
              for Discord Communities.
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-8 text-sm font-ginto font-medium"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
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
                  className="text-[#E0E3FF]/60 hover:text-[#5865F2] transition-colors duration-300 relative group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  whileHover={{ y: -2 }}
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
