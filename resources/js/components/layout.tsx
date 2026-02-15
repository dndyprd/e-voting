import Squares from '@/components/Squares';
import Navbar from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <section className="relative h-screen w-full bg-[#16297c] overflow-y-auto overflow-x-hidden font-sans">
                {/* BACKGROUND ANIMATION */}
                <Squares
                    speed={0.1}
                    squareSize={75}
                    direction='diagonal'
                    borderColor='#112a98'
                    hoverFillColor="#112a98"
                />
                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-6 gap-12 md:gap-24 z-10">
                    {children}
                </div>
            </section>
        </>
    );
}