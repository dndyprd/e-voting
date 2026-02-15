import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Auth } from '@/types';
import { Player } from '@lottiefiles/react-lottie-player';
import Layout from '@/components/layout';
import RotatingText from '@/components/RotatingText';
import Register from '@/components/auth/register';
import Login from '@/components/auth/login';

export default function Welcome() {
    const { props } = usePage<{ name: string; organization_name: string; auth: Auth }>();
    const appName = props.name || 'APP NAME';
    const organization = props.organization_name || 'ORGANIZATION';

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Register
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onLoginClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
            <Login
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onRegisterClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
            />
            <Layout>
                {/* LEFT: TEXT SECTION */}
                <div className="flex flex-col items-center md:items-start justify-center max-w-2xl text-white">
                    {/* HEADER TITLE */}
                    <div className="mb-4 flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                        <h2 className="text-sm md:text-base font-medium tracking-wide">{appName} | {organization}</h2>
                    </div>

                    <h1 className="flex flex-col gap-2 md:flex-row flex-wrap items-center justify-center md:justify-start text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        <span>Vote Your</span>
                        <RotatingText
                            texts={['Best Candidate', 'Future Leader']}
                            mainClassName="px-8 md:px-10 bg-linear-to-tr from-blue-800 to-blue-700 text-white overflow-hidden py-1.5 md:py-2 justify-center rounded-2xl shadow-2xl shadow-blue-500/20"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2500}
                        />
                    </h1>
                    <p className="mt-4 md:mt-6 text-blue-100/70 text-base md:text-lg max-w-2xl text-center md:text-left leading-relaxed">
                        Berikan suara terbaik Anda untuk kandidat pilihan Anda. Jangan lupa pilih dengan sepenuh hati agar tidak menyesalinya nanti.
                    </p>

                    <div className="mt-8 md:mt-12 center flex-wrap md:justify-start gap-4 text-base md:text-lg font-semibold">
                        <a href="/voting" className="btn-home bg-white text-blue-800 shadow-lg hover:bg-blue-50 flex items-center gap-2">
                            <i className="fa-solid fa-inbox"></i> Voting Sekarang
                        </a>
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="cursor-pointer btn-home bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10"
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* RIGHT: ILLUSTRATION SECTION */}
                <div className="mb-8 md:mb-0 relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <div className="relative group">
                        {/* Main Animation Container */}
                        <div className="relative bg-white/5 backdrop-blur-3xl rounded-xl md:rounded-2xl p-6 md:p-12 border border-white/10 shadow-3xl ring-1 ring-white/20 transform hover:scale-101 transition-all duration-700">
                            <Player
                                autoplay
                                loop
                                src="https://lottie.host/4cb158e3-2ece-4d64-b76e-7d182e984395/RwQLhQIuz8.json"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        {/* Floating Decorations (Visible on sm+) */}
                        <div className="absolute -top-10 -left-8 md:-left-12 bg-white rounded-3xl p-4 shadow-2xl z-20 border border-blue-50 transform -rotate-10 group-hover:rotate-4 transition-all duration-500 hidden sm:block">
                            <Player
                                autoplay
                                loop
                                src="https://lottie.host/19d8ecb3-9cc5-4ee2-bd17-8631d22bc0d9/YT6el0Kop0.json"
                                style={{ width: '90px', height: '90px' }}
                            />
                        </div>

                        <div className="absolute -bottom-8 -right-6 md:-right-14 bg-white rounded-3xl p-4 shadow-2xl z-20 border border-blue-50 transform rotate-8 group-hover:-rotate-4 transition-all duration-500 hidden sm:block">
                            <Player
                                autoplay
                                loop
                                src="https://lottie.host/6727b29b-acaf-49c0-93c7-97ac72ae296b/UBSbY0a9g5.json"
                                style={{ width: '90px', height: '90px' }}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
