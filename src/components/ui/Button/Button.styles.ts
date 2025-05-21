export const buttonStyles = (disabled: boolean) => {
  const baseStyles =
    "inline-flex items-center 0 gap-2 rounded-md py-1.5 px-3 text-md font-regular transition duration-150 ease-in-out";

  const disabledStyles = "text-black bg-neutral-500 cursor-not-allowed";
  const enabledStyles = "cursor-pointer";

  return `${baseStyles} ${disabled ? disabledStyles : enabledStyles}`;
};
