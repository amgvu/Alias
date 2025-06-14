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

interface ServerItem {
  name: string;
  iconURL: string;
}

interface DSMenuProps {
  items: ServerItem[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  placeholder?: string;
}

function DSMenu({
  items,
  selectedItem,
  setSelectedItem,
  placeholder,
}: DSMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const title = selectedItem || placeholder;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          <span className={!selectedItem ? "text-neutral-400" : ""}>
            {title}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-neutral-700 hover:text-white transition-all duration-200" />
            ) : (
              <ChevronDown className="h-5 w-5 text-neutral-700 hover:text-white transition-all duration-200" />
            )}
          </motion.div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mt-2 p-1 max-h-60 overflow-auto">
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
                <DropdownMenuItem onClick={() => setSelectedItem(item.name)}>
                  <Image
                    src={item.iconURL}
                    alt={item.name}
                    className="w-5 h-5 inline-block rounded-full mr-2"
                    height="12"
                    width="12"
                  />
                  {item.name}
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
