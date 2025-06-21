import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, Loader2, UsersRound, CirclePlus } from "lucide-react";
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
              className="h-4 w-4 text-text-secondary hover:text-text-primary transition-all duration-200"
            />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-76 flex font-ggSans flex-col mr-32 max-h-60 overflow-auto">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-text-secondary text-sm py-2 justify-center"
          >
            <Loader2 className="animate-spin w-5 h-5" />
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
                  <div className="flex w-full h-5 items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={item.iconURL}
                        alt={item.name}
                        className="w-6 h-6 inline-block rounded-lg"
                        height="32"
                        width="32"
                      />
                      <span className="ml-2 text-sm text-text-primary font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm text-text-primary">
                      {item.memberCount}
                      <UsersRound className="ml-1 mb-0.5 h-3.5 w-3.5 text-zinc-500 inline-block" />
                    </span>
                  </div>
                </DropdownMenuItem>
              </motion.div>
            ))}
            <DropdownMenuItem
              className=""
              onClick={() =>
                window.open("https://app.youform.com/forms/uwk5hpox")
              }
            >
              <div className="flex w-full h-5 items-center justify-between">
                <div className="flex items-center">
                  <CirclePlus className="h-6 mr-2 w-6 text-text-secondary inline-block" />
                  <span className="text-sm text-text-secondary font-medium">
                    Add a server
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          </AnimatePresence>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DSMenu;
