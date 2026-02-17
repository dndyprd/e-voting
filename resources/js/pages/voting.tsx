import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Layout from '@/components/layout';
import TiltedCard from '@/components/TiltedCard';
import Vote from '@/components/auth/vote';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Candidate {
    name: string;
    order: number;
    image: string;
    visi: string[];
    misi: string[];
    divisi: string;
}

export default function Voting() {
    const candidate = [
        {
            name: 'Candidate 1',
            order: 1,
            image: '/img/kandidat/kandidat.png',
            visi: ['Menjadikan organisasi sebagai wadah aspirasi yang inovatif, transparan, dan inklusif bagi seluruh anggota.'],
            misi: [
                'Meningkatkan kolaborasi antar divisi melalui program kerja yang terintegrasi.',
                'Menyelenggarakan forum diskusi rutin untuk mendengar dan merealisasikan aspirasi anggota.',
                'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
                'Mengoptimalkan penggunaan teknologi digital dalam manajemen administrasi organisasi.',
                'Membangun karakter kepemimpinan yang berintegritas dan profesional.',
                'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
            ],
            divisi: 'Kelas 3A',
        },
        {
            name: 'Candidate 2',
            order: 2,
            image: '/img/kandidat/kandidat2.png',
            visi: ['Membangun ekosistem organisasi yang kreatif, mandiri, dan berdampak positif bagi lingkungan sekitar.'],
            misi: [
                'Mendorong pengembangan minat dan bakat anggota melalui pelatihan intensif.',
                'Memperluas jaringan kerja sama dengan pihak eksternal untuk peluang kolaborasi.',
                'Mewujudkan budaya kerja yang disiplin namun tetap mengedepankan kekeluargaan.',
                'Menciptakan inovasi program kerja yang berbasis solusi atas masalah yang ada.'
            ],
            divisi: 'Kelas 3B',
        },
        {
            name: 'Candidate 3',
            order: 3,
            image: '/img/kandidat/kandidat3.png',
            visi: ['Menciptakan organisasi yang solid, adaptif terhadap perubahan, dan unggul dalam pencapaian prestasi.'],
            misi: [
                'Memperkuat koordinasi internal melalui sistem komunikasi yang lebih efisien.',
                'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.',
                'Memfasilitasi ide-ide kreatif anggota untuk menjadi program kerja yang nyata.',
                'Mengadakan program mentoring untuk pemantapan kompetensi anggota.',
                'Meningkatkan standar kualitas setiap kegiatan yang diselenggarakan organisasi.'
            ],
            divisi: 'Kelas 3C',
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    const handleVoteClick = (item: Candidate) => {
        setSelectedCandidate(item);
        setIsModalOpen(true);
    };

    return (
        <>
            <Head title="Voting">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Vote
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                candidate={selectedCandidate}
            />
            <Layout>
                <div className="center flex-col gap-4 w-full max-w-6xl md:pt-12">
                    {/* Header */}
                    <div className="center bg-white text-blue-950 px-4 py-2 md:px-10 gap-2 md:gap-4 w-full rounded-2xl">
                        <Player
                            autoplay
                            loop
                            src="https://assets1.lottiefiles.com/packages/lf20_dwmb4mrt.json"
                            className="rounded-full w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                        />
                        <div className="flex flex-col md:gap-2">
                            <h3 className="text-lg md:text-4xl font-semibold tracking-tight">Vote <span className="text-blue-800">Kandidat Terbaikmu</span> !</h3>
                            <p className="text-sm md:text-lg">Geser kartu untuk melihat kandidat lainnya.
                                Klik kartu untuk melihat detail kandidat.</p>
                        </div>
                    </div>

                    {/* Card Candidate */}
                    <div className="relative w-full">
                        <div className="bg-white px-4 py-6 md:px-10 md:py-4 w-full rounded-3xl relative group">
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={true}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    1024: {
                                        slidesPerView: candidate.length < 3 ? 2 : 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                className="!px-4"
                            >
                                {candidate.map((item, index) => (
                                    <SwiperSlide key={index} className="pt-4 pb-8">
                                        <TiltedCard>
                                            <div onClick={() => handleVoteClick(item)} className="cursor-pointer bg-white text-blue-950 w-full rounded-2xl flex flex-col gap-2 overflow-hidden shadow-lg transition-all duration-500 border border-blue-50/50">
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.name}
                                                    className="w-full aspect-[3/4] object-cover hover:scale-102 transition-transform duration-700"
                                                />
                                            </div>
                                        </TiltedCard>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Buttons */}
                            <button className="btn-slide swiper-button-prev-custom left-2 md:-left-6">
                                <i className="fa-solid fa-chevron-left text-lg"></i>
                            </button>
                            <button className="btn-slide swiper-button-next-custom right-2 md:-right-6">
                                <i className="fa-solid fa-chevron-right text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}