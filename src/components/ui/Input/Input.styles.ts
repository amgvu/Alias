export const inputContainerStyles = (className?: string) => {
  return `flex flex-col space-y-1 ${className || ""}`;
};

export const inputLabelStyles = "text-zinc-200";

export const inputStyles =
  "cursor-pointer pl-2 h-7 focus:cursor-auto transition-all max-w-full rounded-md text-zinc-100 border-transparent shadow-white/10 focus:outline-hidden focus:ring-1 focus:bg-zinc-800 focus:ring-zinc-100 transition duration-200 ease-in-out w-full";
