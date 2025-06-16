import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Server } from "@/types/types";

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
          <div>
            <ChevronsUpDown
              onClick={() => setIsOpen(true)}
              className="h-4 w-4 text-zinc-700 hover:text-white transition-all duration-200"
            />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 flex flex-col mr-4 max-h-60 overflow-auto">
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
                  <Image
                    src={item.iconURL}
                    alt={item.name}
                    className="w-9 h-9 inline-block rounded-lg"
                    height="32"
                    width="32"
                  />
                  <span className="ml-2">{item.name}</span>
                  <span>{item.memberCount}</span>
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
