import { motion } from "motion/react";
import { FaRocket, FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks";

export default function Cta() {
  const { handleDiscordLogin } = useAuth();

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-card-background/30 backdrop-blur-sm border border-border-subtle hover:border-[#5865F2]/30 p-12 text-center transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/5 to-[#8B5CF6]/10 rounded-3xl" />
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
              Get an early scoop of Alias&apos;s features and have fun with your
              friends today.
            </p>
            <Button
              onClick={handleDiscordLogin}
              className="cursor-pointer group bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A8] text-white font-ginto font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
  );
}
