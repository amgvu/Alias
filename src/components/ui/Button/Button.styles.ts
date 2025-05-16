export const buttonStyles = (disabled: boolean) => {
  const baseStyles =
    "inline-flex items-center 0 gap-2 rounded-md py-1.5 px-3 text-md font-regular transition duration-150 ease-in-out";

  const disabledStyles = "bg-transparent text-neutral-600 cursor-not-allowed";
  const enabledStyles =
    "text-neutral-100 cursor-pointer hover:text-neutral-100 active:bg-neutral-100 active:text-neutral-950";

  return `${baseStyles} ${disabled ? disabledStyles : enabledStyles}`;
};
