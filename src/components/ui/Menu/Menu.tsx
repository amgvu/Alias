import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Server } from "@/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DSMenuProps {
  items: Server[];
  setSelectedItem: (item: Server) => void;
}

function DSMenu({ items, setSelectedItem }: DSMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          <motion.div animate={{ rotate: isOpen ? 360 : 0 }}>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-zinc-700 hover:text-white transition-all duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-700 hover:text-white transition-all duration-200" />
            )}
          </motion.div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-12 mt-2 p-1 max-h-60 overflow-auto">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-zinc-400 text-sm py-2 justify-center"
          >
            <Loader2 className="animate-spin w-5 h-5" />
            Loading Servers...
          </motion.div>
        ) : (
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenuItem onClick={() => setSelectedItem(item)}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src={item.iconURL}
                        alt={item.name}
                        className="w-6 h-6 inline-block rounded-lg mr-2"
                        height="32"
                        width="32"
                      />
                    </TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DSMenu;
