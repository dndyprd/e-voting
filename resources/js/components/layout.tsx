import Squares from '@/components/Squares';
import Navbar from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
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
                <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-12 md:gap-24">
                    {children}
                </div>
            </main>
        </>
    );
}