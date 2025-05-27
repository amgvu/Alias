import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Arc } from "@/types/types";
import { motion } from "framer-motion";
import { useArcManagement } from "@/lib/hooks/useArcManagement";

interface DSCreateMenuProps {
  selectedServer: string;
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  onCreateNewArc: (newArcName: string) => void;
}

import { useState } from "react";
import { Member } from "@/types/types";

const DSCreateMenu: React.FC<DSCreateMenuProps> = ({
  selectedServer,
  selectedArc,
  setSelectedArc,
}) => {
  const [members, setMembers] = useState<Member[]>([]);
  const {
    query,
    setQuery,
    isLoading,
    isExpanded,
    setIsExpanded,
    handleOpen,
    handleDeleteArc,
    filteredArcs,
    showCreateOption,
  } = useArcManagement(selectedServer, members, setMembers);

  return (
    <Combobox
      value={selectedArc}
      onChange={setSelectedArc}
      onClose={() => setQuery("")}
      as="div"
      className="relative w-full"
    >
      <div className="relative">
        <Combobox.Input
          onFocus={handleOpen}
          displayValue={(arc: Arc | null) => arc?.arc_name || ""}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full p-2 pr-10 bg-black border cursor-pointer focus:cursor-auto border-[#252525] rounded-lg transition-all text-neutral-100 focus:outline-hidden focus:ring-1 focus:ring-neutral-100"
          placeholder="Select or create a set"
        />
        <Combobox.Button
          as="div"
          className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
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
        </Combobox.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full border border-[#252525] overflow-y-auto rounded-lg bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
          {isLoading ? (
            <div className="relative cursor-default select-none px-4 py-2 text-neutral-400">
              Loading sets...
            </div>
          ) : filteredArcs.length === 0 && !showCreateOption ? (
            <div className="relative cursor-default select-none px-4 py-2 text-neutral-400">
              No sets found
            </div>
          ) : (
            <>
              {(filteredArcs as Arc[]).map((arc: Arc) => (
                <Combobox.Option
                  key={arc.id}
                  value={arc}
                  className={({ active }) => `
                    relative cursor-pointer select-none py-2 pl-4 pr-4
                    ${
                      active
                        ? "bg-neutral-900 transition-all rounded-lg text-neutral-white"
                        : "text-neutral-400 hover:text-white"
                    }
                  `}
                >
                  {({ selected }) => (
                    <div className="flex justify-between items-center w-full">
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {arc.arc_name}
                      </span>
                      <button
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteArc(arc.id, selectedArc, setSelectedArc);
                        }}
                        className="hover:text-red-400 ml-2"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400 transition-all duration-200 hover:text-red-700 cursor-pointer" />
                      </button>
                    </div>
                  )}
                </Combobox.Option>
              ))}
              {showCreateOption && (
                <Combobox.Option
                  value={{ id: -1, arc_name: query, guild_id: selectedServer }}
                  className={({ active }) => `
                    relative cursor-pointer hover:bg-neutral-900 transition-all rounded-lg select-none py-2 pl-4 pr-4 flex items-center
                    ${
                      active
                        ? "bg-neutral-950 text-neutral-400 hover:text-white"
                        : "text-white"
                    }
                  `}
                >
                  <PlusIcon className="h-4 w-4 mr-2 text-neutral-400" />
                  <span className="block truncate">
                    Create &apos;{query}&apos;
                  </span>
                </Combobox.Option>
              )}
            </>
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default DSCreateMenu;
