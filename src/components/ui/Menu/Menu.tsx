import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  menuButtonStyles,
  menuItemsStyles,
  menuItemStyles,
} from "./Menu.styles";

interface DSMenuProps {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  placeholder?: string;
}

const DSMenu: React.FC<DSMenuProps> = ({
  items,
  selectedItem,
  setSelectedItem,
  placeholder,
}) => {
  const title = selectedItem || placeholder;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Menu as="div" className="relative w-full">
      <Menu.Button
        className={menuButtonStyles}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={!selectedItem ? "text-neutral-400" : ""}>{title}</span>
        <motion.div animate={{ rotate: isExpanded ? 360 : 0 }}>
          {isExpanded ? (
            <ChevronDown
              className="h-5 w-5 cursor-pointer text-neutral-700 hover:text-white transition-all duration-200"
              aria-hidden="true"
            />
          ) : (
            <ChevronUp
              className="h-5 w-5 cursor-pointer text-neutral-700 hover:text-white transition-all duration-200"
              aria-hidden="true"
            />
          )}
        </motion.div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={menuItemsStyles}>
          <div className="py-1">
            {items.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <button
                    className={menuItemStyles(active)}
                    onClick={() => setSelectedItem(item)}
                  >
                    {item}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DSMenu;
