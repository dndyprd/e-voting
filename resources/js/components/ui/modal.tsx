import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxW?: string;
}

export default function Modal({ isOpen, onClose, children, maxW = "max-w-lg" }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    ></motion.div>

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                        className={`relative bg-white w-full ${maxW} rounded-t-[2rem] sm:rounded-2xl pt-6 pb-12 px-6 md:p-8 shadow-2xl overflow-hidden`}
                    >

                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}