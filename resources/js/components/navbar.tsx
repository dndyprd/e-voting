import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const listNavbar = [
        {
            name: "Home",
            href: "/",
            icon: "fa-solid fa-house"
        },
        {
            name: "Voting",
            href: "/voting",
            icon: "fa-solid fa-check-to-slot"
        },
        {
            name: "Grafik",
            href: "/grafik",
            icon: "fa-solid fa-chart-simple"
        },
        {
            name: "Profile",
            href: "/profile",
            icon: "fa-solid fa-user"
        },
    ];

    return (
        <>
            {/* NAVBAR : DESKTOP */}
            <div className="fixed top-8 right-8 z-50 hidden md:block font-['Poppins']">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer flex items-center gap-3 px-6 py-2 bg-white text-blue-900 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
                >
                    <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                    <span>Menu</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 10, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full right-0 w-56 bg-white rounded-3xl shadow-2xl p-2 flex flex-col gap-1 border border-gray-100"
                        >
                            {listNavbar.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-4 px-5 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-2xl transition-all duration-300 font-medium group"
                                >
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-100 transition-colors">
                                        <i className={`${item.icon} text-sm`}></i>
                                    </div>
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* NAVBAR : MOBILE */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
                <div className="grid grid-cols-4 w-full px-2">
                    {listNavbar.map((item) => {
                        const isActive = url === item.href;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center py-3 gap-1 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}
                            >
                                <i className={`${item.icon} text-xl mb-0.5 ${isActive ? 'font-bold' : ''}`}></i>
                                <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
}