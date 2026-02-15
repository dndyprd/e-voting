import { motion } from "motion/react";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterClick: () => void;
}

export default function Login({ isOpen, onClose, onRegisterClick }: LoginProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white w-full max-w-lg rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-6 right-6 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                {/* Header */}
                <div className="text-center mb-8 mt-2">
                    <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">Login</h3>
                    <p className="text-gray-600 font-medium">Masuk untuk dapat melakukan voting!</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5">
                    {/* Kode */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="code" className="text-gray-800 font-medium text-lg ml-1">Kode</label>
                        <input
                            type="text"
                            id="code"
                            placeholder="********"
                            className="w-full px-6 py-3.5 rounded-2xl border border-blue-100 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Konfirmasi Kode */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="confirm_code" className="text-gray-800 font-medium text-lg ml-1">Konfirmasi Kode</label>
                        <input
                            type="text"
                            id="confirm_code"
                            placeholder="********"
                            className="w-full px-6 py-3.5 rounded-2xl border border-blue-100 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 outline-none"
                        />
                        <span className="text-sm text-gray-500 ml-1">*Masukkan kode akses lagi.</span>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 flex flex-col gap-6 text-center">
                        <p className="text-gray-500">
                            Anda belum memiliki kode akses? <button onClick={onRegisterClick} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all cursor-pointer">Klik disini</button>
                        </p>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white text-xl font-bold rounded-2xl active:scale-[0.98] transition-all duration-300 center gap-3 cursor-pointer"
                        >
                            <i className="fa-solid fa-circle-arrow-right"></i>
                            Login
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}