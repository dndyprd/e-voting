import { motion } from "motion/react";

interface RegisterProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

export default function Register({ isOpen, onClose, onLoginClick }: RegisterProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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
                <div className="text-center mb-6 mt-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">Request Kode Akses</h3>
                    <p className="text-gray-500 font-medium">Masukkan nama dan email aktif Anda.</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5">
                    {/* Nama */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="name" className="text-gray-700 font-semibold ml-1">Nama Lengkap</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Masukkan nama terdaftar Anda"
                            className="w-full px-6 py-3.5 rounded-2xl border border-gray-200 text-gray-700 placeholder:text-gray-400/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        />
                        <span className="text-xs text-gray-400 ml-1 font-medium">*Pastikan nama sesuai dengan yang terdaftar.</span>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="email" className="text-gray-700 font-semibold ml-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Kode akan dikirim ke email ini"
                            className="w-full px-6 py-3.5 rounded-2xl border border-gray-200 text-gray-700 placeholder:text-gray-400/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                        />
                        <span className="text-xs text-gray-400 ml-1 font-medium">*Gunakan email aktif Anda.</span>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 flex flex-col gap-4 text-center">
                        <p className="text-gray-500 font-medium">
                            Sudah punya kode? <button onClick={onLoginClick} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all cursor-pointer">Login disini</button>
                        </p>

                        <button
                            type="submit"
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl active:scale-[0.98] transition-all duration-300"
                        >
                            Kirim Permintaan
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}