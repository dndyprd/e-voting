import { useForm } from "@inertiajs/react";
import Modal from "../ui/modal";
import { FormEvent, useState } from "react";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterClick: () => void;
}

export default function Login({ isOpen, onClose, onRegisterClick }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        auth_code: '',
        confirm_code: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (data.auth_code !== data.confirm_code) {
            setError('Kode akses tidak sama!');
            return;
        }

        post('/login', {
            onSuccess: () => {
                console.log('Created by Dandy Pradnyana :D');
                reset();
                onClose();
            },
            onError: (errors) => {
                if (errors.auth_code) {
                    setError(errors.auth_code);
                }
            },
        });
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Kode */}
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="auth_code" className="text-gray-800 font-medium text-lg ml-1">Kode</label>
                    <input
                        type="text"
                        id="auth_code"
                        value={data.auth_code}
                        onChange={(e) => setData('auth_code', e.target.value)}
                        placeholder="********"
                        className="w-full px-6 py-3.5 rounded-2xl border border-blue-100 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 outline-none"
                        required
                    />
                    {errors.auth_code && <span className="text-sm text-red-500 ml-1">{errors.auth_code}</span>}
                </div>

                {/* Konfirmasi Kode */}
                <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="confirm_code" className="text-gray-800 font-medium text-lg ml-1">Konfirmasi Kode</label>
                    <input
                        type="text"
                        id="confirm_code"
                        value={data.confirm_code}
                        onChange={(e) => setData('confirm_code', e.target.value)}
                        placeholder="********"
                        className="w-full px-6 py-3.5 rounded-2xl border border-blue-100 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 outline-none"
                        required
                    />
                    <span className="text-sm text-gray-500 ml-1">*Masukkan kode akses lagi.</span>
                    {error && <span className="text-sm text-red-500 ml-1">{error}</span>}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex flex-col gap-6 text-center">
                    <p className="text-gray-500">
                        Anda belum memiliki kode akses? <button type="button" onClick={onRegisterClick} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all cursor-pointer">Klik disini</button>
                    </p>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white text-xl font-bold rounded-2xl active:scale-[0.98] transition-all duration-300 center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-circle-arrow-right"></i>
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}