import { Head } from '@inertiajs/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Layout from '@/components/layout';
import TiltedCard from '@/components/TiltedCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Voting() {

    const candidate = [
        {
            id: 1,
            name: 'Candidate 1',
            image: '/img/kandidat/kandidat.png',
            description: 'Candidate 1 Description',
        },
        {
            id: 2,
            name: 'Candidate 2',
            image: '/img/kandidat/kandidat2.png',
            description: 'Candidate 2 Description',
        },
        {
            id: 3,
            name: 'Candidate 3',
            image: '/img/kandidat/kandidat3.png',
            description: 'Candidate 3 Description',
        },
    ];

    return (
        <>
            <Head title="Voting">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Layout>
                <div className="center flex-col gap-4 w-full max-w-6xl py-12">
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
                    <div className="relative w-full px-4 md:px-0">
                        <div className="bg-white px-4 py-6 md:px-10 md:py-8 w-full rounded-3xl relative group">
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
                                {candidate.map((item) => (
                                    <SwiperSlide key={item.id} className="pt-4 pb-8">
                                        <TiltedCard>
                                            <div className="cursor-pointer bg-white text-blue-950 w-full rounded-2xl flex flex-col gap-2 overflow-hidden shadow-lg transition-all duration-500 border border-blue-50/50">
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.name}
                                                    className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-700"
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