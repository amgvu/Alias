import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Arc } from "@/types/types";
import { motion } from "framer-motion";
import { fetchArcs, deleteArc } from "@/lib/utilities/api";

interface DSCreateMenuProps {
  selectedServer: string;
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  onCreateNewArc: (newArcName: string) => void;
}

const DSCreateMenu: React.FC<DSCreateMenuProps> = ({
  selectedServer,
  selectedArc,
  setSelectedArc,
}) => {
  const [query, setQuery] = useState("");
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setSelectedArc(null);
    setQuery("");
    setArcs([]);
  }, [selectedServer, setSelectedArc]);

  const handleOpen = async () => {
    if (!selectedServer) return;

    setIsLoading(true);
    try {
      const fetchedArcs = await fetchArcs(selectedServer);
      setArcs(fetchedArcs);
    } catch (error) {
      console.error("Failed to fetch arcs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArc = async (arcId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this arc? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteArc(arcId);
      const updatedArcs = await fetchArcs(selectedServer);
      setArcs(updatedArcs);

      if (selectedArc?.id === arcId) {
        setSelectedArc(null);
      }
    } catch (error) {
      console.error("Failed to delete arc:", error);
      alert("Failed to delete arc. Please try again.");
    }
  };

  const filteredArcs =
    query === ""
      ? arcs
      : arcs.filter(
          (arc) =>
            arc.arc_name &&
            arc.arc_name.toLowerCase().includes(query.toLowerCase())
        );

  const showCreateOption =
    query !== "" &&
    !filteredArcs.some(
      (arc) => arc.arc_name.toLowerCase() === query.toLowerCase()
    );

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
          className="w-full p-2 pr-10 bg-black border cursor-pointer focus:cursor-auto border-neutral-700 rounded-lg transition-all text-neutral-100 focus:outline-hidden focus:ring-1 focus:ring-neutral-100"
          placeholder="Select or create an arc"
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
        <Combobox.Options className="absolute z-10 mt-1 max-h-48 w-full border border-neutral-700 overflow-y-auto rounded-lg bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
          {isLoading ? (
            <div className="relative cursor-default select-none px-4 py-2 text-neutral-400">
              Loading arcs...
            </div>
          ) : filteredArcs.length === 0 && !showCreateOption ? (
            <div className="relative cursor-default select-none px-4 py-2 text-neutral-400">
              No arcs found
            </div>
          ) : (
            <>
              {filteredArcs.map((arc) => (
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
                          handleDeleteArc(arc.id);
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
