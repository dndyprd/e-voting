import { useEffect } from 'react';
import Modal from "@/components/ui/modal";
import { useForm, usePage } from "@inertiajs/react";
import { Auth } from "@/types/auth";

interface Candidate {
    id: number;
    name: string;
    order: number;
    image: string;
    visi: string;
    misi: string[];
    divisi: {
        name: string;
    } | string;
}

interface VoteProps {
    isOpen: boolean;
    onClose: () => void;
    candidate?: Candidate;
}

export default function Vote({ isOpen, onClose, candidate }: VoteProps) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isVoted = auth.user?.is_voted;

    const { post, processing, setData, data } = useForm({
        candidate_id: candidate?.id,
    });

    useEffect(() => {
        if (candidate?.id) {
            setData('candidate_id', candidate.id);
        }
    }, [candidate]);

    if (!candidate) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isVoted || processing || !data.candidate_id) return;

        post('/vote', {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxW="max-w-3xl md:max-w-5xl">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 sm:top-6 sm:right-6 text-blue-600 hover:text-blue-800 transition-colors duration-300 z-10"
            >
                <i className="fa-solid fa-xmark text-2xl"></i>
            </button>

            {/* Content */}
            <div className="flex flex-row gap-4 sm:gap-6 items-start">
                {/* Candidate Image */}
                <div className="flex-shrink-0">
                    <img
                        src={`/storage/${candidate.image}`}
                        alt={candidate.name}
                        className="w-24 sm:w-36 aspect-[3/4] object-cover rounded-lg shadow-md sm:shadow-lg"
                    />
                </div>

                {/* Candidate Info */}
                <div className="flex-1 flex flex-col gap-1 sm:gap-2">
                    {/* Name */}
                    <div>
                        <h3 className="text-xs sm:text-base font-semibold text-blue-600 mb-0.5 sm:mb-1">Nama</h3>
                        <p className="text-base sm:text-xl font-medium text-gray-800 leading-tight">{candidate.name}</p>
                    </div>

                    {/* Division */}
                    <div className="flex flex-col sm:block">
                        <h3 className="text-xs sm:text-base font-semibold text-blue-600 mb-0.5 sm:mb-1">Divisi</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium ">
                            {typeof candidate.divisi === 'string' ? candidate.divisi : candidate.divisi?.name}
                        </p>
                    </div>

                    {/* Order */}
                    <div className="flex flex-col sm:block">
                        <h3 className="text-xs sm:text-base font-semibold text-blue-600 mb-0.5 sm:mb-1">Urutan</h3>
                        <p className="text-sm sm:text-base text-gray-700 font-medium">Nomor Ke-{candidate.order}</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Detail Area */}
            <div className="mt-6 sm:mt-8 space-y-4 max-h-[35vh] overflow-y-auto px-1 -mx-1 custom-scrollbar">
                {/* Visi */}
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-blue-600 mb-2">Visi</h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {candidate.visi}
                    </p>
                </div>

                {/* Misi */}
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-blue-600 mb-2">Misi</h3>
                    {candidate.misi.length > 1 ? (
                        <ul className="list-disc list-inside text-gray-700 flex flex-col gap-1 sm:gap-2">
                            {candidate.misi.map((item, index) => (
                                <li key={index} className="text-sm sm:text-base leading-relaxed">{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {candidate.misi[0]}
                        </p>
                    )}
                </div>
            </div>

            {/* Vote Button */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-10">
                <button
                    type="submit"
                    disabled={isVoted || processing}
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 
                        ${isVoted
                            ? 'bg-gray-400 cursor-not-allowed text-gray-100 shadow-none'
                            : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-xl active:scale-[0.98]'
                        } ${processing ? 'opacity-70 cursor-wait' : ''}`}
                >
                    <i className={`fa-solid ${isVoted ? 'fa-check' : (processing ? 'fa-spinner fa-spin' : 'fa-thumbs-up')}`}></i>
                    <span>
                        {isVoted
                            ? 'Satu Suara Anda Sudah Direkam'
                            : (processing ? 'Sedang Memproses...' : 'Vote Sekarang!')
                        }
                    </span>
                </button>
                {isVoted && (
                    <p className="text-center text-gray-500 text-xs mt-3 italic">
                        *Anda hanya diperbolehkan memberikan suara sebanyak satu kali.
                    </p>
                )}
            </form>
        </Modal>
    );
}