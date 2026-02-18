import { motion, AnimatePresence } from "motion/react";

interface NotificationProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

export default function Notification({ isOpen, onClose, title, message, type = 'success' }: NotificationProps) {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return {
                    icon: <i className="fa-solid fa-check text-4xl"></i>,
                    color: 'bg-green-100 text-green-500'
                };
            case 'error':
                return {
                    icon: <i className="fa-solid fa-xmark text-4xl"></i>,
                    color: 'bg-red-100 text-red-500'
                };
            case 'warning':
                return {
                    icon: <i className="fa-solid fa-triangle-exclamation text-4xl"></i>,
                    color: 'bg-amber-100 text-amber-500'
                };
            default:
                return {
                    icon: <i className="fa-solid fa-circle-info text-4xl"></i>,
                    color: 'bg-blue-100 text-blue-500'
                };
        }
    };

    const config = getIcon();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    />

                    {/* Notification Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center gap-4"
                    >
                        {/* Icon Container */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${config.color}`}>
                            {config.icon}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-bold text-blue-950">{title}</h2>
                            <p className="text-gray-500 leading-relaxed">
                                {message}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}