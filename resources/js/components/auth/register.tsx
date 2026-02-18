import Modal from "@/components/ui/modal";
import Notification from "@/components/ui/notification";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";

interface RegisterProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick: () => void;
}

export default function Register({ isOpen, onClose, onLoginClick }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => {
                    reset();
                    setShowSuccess(false);
                    onLoginClick(); // Switch to login modal after success
                }, 3000);
            },
        });
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-6 right-6 text-blue-600 hover:text-blue-800 transition-colors duration-300 z-10"
                >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                </button>

                {/* Header */}
                <div className="text-center mb-6 mt-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">Request Kode Akses</h3>
                    <p className="text-gray-500 font-medium">Masukkan nama dan email aktif Anda.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Nama */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="name" className="text-gray-700 font-semibold ml-1">Nama Lengkap</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Masukkan nama terdaftar Anda"
                            className="w-full px-6 py-3.5 rounded-2xl border border-gray-200 text-gray-700 placeholder:text-gray-400/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            required
                        />
                        <span className="text-xs text-gray-400 ml-1 font-medium">*Pastikan nama sesuai dengan yang terdaftar.</span>
                        {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="email" className="text-gray-700 font-semibold ml-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Kode akan dikirim ke email ini"
                            className="w-full px-6 py-3.5 rounded-2xl border border-gray-200 text-gray-700 placeholder:text-gray-400/80 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-300 bg-gray-50/50 hover:bg-white"
                            required
                        />
                        <span className="text-xs text-gray-400 ml-1 font-medium">*Gunakan email aktif Anda.</span>
                        {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email}</span>}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 flex flex-col gap-4 text-center">
                        <p className="text-gray-500 font-medium">
                            Sudah punya kode? <button type="button" onClick={onLoginClick} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all cursor-pointer">Login disini</button>
                        </p>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-2xl active:scale-[0.98] transition-all duration-300 disabled:opacity-70 cursor-pointer"
                        >
                            {processing ? 'Mengirim...' : 'Kirim Permintaan'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Notification
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Permintaan Terkirim!"
                message="Silakan periksa email Anda secara berkala untuk mendapatkan kode akses voting."
                type="success"
            />
        </>
    );
}