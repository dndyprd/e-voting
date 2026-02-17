import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Auth } from '@/types';
import Layout from '@/components/layout';
import Register from '@/components/auth/register';
import Login from '@/components/auth/login';

export default function Profile() {
    const { props } = usePage<{ auth: Auth }>();
    const { auth } = props;

    const description = !auth.user
        ? "Selamat datang di halaman profil. Login terlebih dahulu untuk melakukan voting"
        : auth.user.is_voted
            ? "Selamat datang di halaman profile. Terima kasih sudah melakukan voting"
            : "Selamat datang di halaman profile. Voting kandidat jagoanmu";

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <Head title="Profile">
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
                <div className="py-8 md:p-0">
                    <div className="bg-white text-blue-950 px-10 md:px-14 py-8 md:py-12 w-full max-w-5xl rounded-2xl center flex-col md:flex-row gap-6 md:gap-12">
                        <Player
                            autoplay
                            loop
                            src="https://assets10.lottiefiles.com/private_files/lf30_XAX6ye.json"
                            className="rounded-full w-full"
                            style={{ width: '200px', height: '200px' }}
                        />
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Hi, <span className="text-blue-800">{auth.user?.name || 'Guest'}</span>!
                            </h1>
                            <p className="text-sm md:text-lg max-w-md leading-relaxed">
                                {description}
                            </p>
                            <button onClick={() => setIsLoginOpen(true)}
                                className="mt-4 center btn-home bg-blue-800 text-white shadow-lg hover:bg-blue-900 gap-2">
                                <i className="fa-solid fa-right-to-bracket"></i> Login
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}