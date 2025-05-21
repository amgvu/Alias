import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DSDialogProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DSDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: DSDialogProps) => (
  <AnimatePresence>
    {isOpen && (
      <Dialog
        open={isOpen}
        as="div"
        className="relative transition-all z-10 focus:outline-none"
        onClose={onCancel}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-10 w-screen overflow-y-auto"
        >
          <div className="flex min-h-full bg-black/70 transition-all items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-md p-6 bg-neutral-950 border-neutral-700 border duration-300 ease-out">
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                {title}
              </DialogTitle>
              <div className="mt-2 text-sm/6 text-white/60">{message}</div>
              <div className="mt-4 flex gap-3">
                <Button
                  className="inline-flex cursor-pointer transition-all items-center gap-2 rounded-md hover:bg-neutral-800 py-1.5 px-3 text-sm/6 font-regular text-white"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex cursor-pointer transition-all items-center gap-2 rounded-md bg-red-500 hover:bg-red-600 py-1.5 px-3 text-sm/6 font-regular text-neutral-100"
                  onClick={onConfirm}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </motion.div>
      </Dialog>
    )}
  </AnimatePresence>
);

export default DSDialog;
