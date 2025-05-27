export const menuButtonStyles =
  "w-full flex justify-between items-center bg-black border rounded-lg border-[#252525] p-2 text-left h-10";

export const menuItemsStyles =
  "absolute z-10 mt-1 w-full bg-black border border-[#252525] rounded-lg shadow-lg";

export const menuItemStyles = (active: boolean) => {
  return `${
    active ? "bg-black text-neutral-100" : "text-neutral-300"
  } block w-full text-left px-4 py-2 text-sm`;
};
