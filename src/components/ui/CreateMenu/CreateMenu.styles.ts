export const menuButtonStyles =
  "w-full flex justify-between items-center bg-black border rounded-lg border-neutral-700 p-2 text-left h-10";

export const menuItemsStyles =
  "absolute z-10 mt-1 w-full bg-black border border-neutral-700 rounded-lg shadow-lg";

export const menuItemStyles = (active: boolean) => {
  return `${
    active ? "bg-black text-neutral-100" : "text-neutral-300"
  } block w-full text-left px-4 py-2 text-sm`;
};
