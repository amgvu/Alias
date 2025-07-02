export const shiftVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [0, 10, 0],
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      delay: (index % 50) * 0.06,
    },
  }),
};

export const swapVariants = {
  initial: {
    scale: 1,
  },
  swap: {
    y: [0, 4, 0],
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      times: [0, 0.5, 1],
    },
  },
};
