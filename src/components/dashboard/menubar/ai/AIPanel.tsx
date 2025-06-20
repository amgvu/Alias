import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function AIPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-panel border-r translate-x-78 -translate-y-5 h-screen border-border w-64"
    >
      <div>
        <div className="border-b border-border p-4">
          <h1 className="font-">AI</h1>
        </div>
        <div className="space-y-6 px-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4"></div>

            <div className="flex gap-2">
              <Input className="flex-grow bg-input border border-border text-text-primary focus:ring-1 focus:ring-border-active" />
              <Button className="cursor-pointer bg-transparent text-zinc-500 hover:text-zinc-400 hover:bg-transparent ">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-2 max-h-screen overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{
                      height: "auto",
                      zIndex: 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="cursor-pointer bg-card-panel group overflow-hidden border-border hover:border-border-active transition-all relative"></div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
