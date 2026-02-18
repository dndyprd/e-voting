import { useState, useEffect } from 'react';
import Squares from '@/components/Squares';
import Navbar from '@/components/navbar';
import { usePage } from '@inertiajs/react';
import { Timer } from '@/components/timer';
import Notification from '@/components/ui/notification';

interface AppSettings {
    start_date: string | null;
    end_date: string | null;
}

interface FlashProps {
    success: string | null;
    error: string | null;
    warning: string | null;
    info: string | null;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const { app_settings, flash } = usePage<{ app_settings: AppSettings; flash: FlashProps }>().props;
    const [isTimerVisible, setIsTimerVisible] = useState(true);
    const [notification, setNotification] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    useEffect(() => {
        if (flash.success) {
            setNotification({ isOpen: true, title: 'Berhasil', message: flash.success, type: 'success' });
        } else if (flash.error) {
            setNotification({ isOpen: true, title: 'Kesalahan', message: flash.error, type: 'error' });
        } else if (flash.warning) {
            setNotification({ isOpen: true, title: 'Perhatian', message: flash.warning, type: 'warning' });
        } else if (flash.info) {
            setNotification({ isOpen: true, title: 'Informasi', message: flash.info, type: 'info' });
        }
    }, [flash]);

    const now = new Date().getTime();
    const start = app_settings?.start_date ? new Date(app_settings.start_date).getTime() : 0;
    const end = app_settings?.end_date ? new Date(app_settings.end_date).getTime() : 0;
    const status = now < start ? 'waiting' : (now < end ? 'running' : 'ended');

    return (
        <>
            <Navbar />
            <Notification
                isOpen={notification.isOpen}
                onClose={() => setNotification({ ...notification, isOpen: false })}
                title={notification.title}
                message={notification.message}
                type={notification.type}
            />
            <main className="relative min-h-screen w-full bg-[#16297c] font-sans overflow-x-hidden selection:bg-blue-500/30">
                {/* BACKGROUND PATTERN */}
                <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
                    <Squares
                        speed={0.1}
                        squareSize={75}
                        direction='diagonal'
                        borderColor='#112a98'
                        hoverFillColor="#112a98"
                    />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-6 md:px-12 lg:px-24 gap-12 md:gap-16 lg:gap-24">
                    {children}

                    {/* FLOATING TIMER CONTAINER */}
                    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-start gap-4">
                        {/* THE TIMER CARD */}
                        <div className={`transition-all duration-500 transform origin-left ${isTimerVisible ? 'scale-100 opacity-100 translate-x-0' : 'scale-0 opacity-0 -translate-x-10 pointer-events-none'}`}>
                            <Timer
                                startDate={app_settings?.start_date}
                                endDate={app_settings?.end_date}
                            />
                        </div>

                        {/* TOGGLE BUTTON */}
                        <button
                            onClick={() => setIsTimerVisible(!isTimerVisible)}
                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                        >
                            <i className={`fa-solid ${isTimerVisible ? 'fa-eye-slash' : 'fa-clock'} md:text-lg`}></i>
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}