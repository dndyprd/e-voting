import Squares from "@/components/Squares";

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-[#16297c]">
            <Squares
                speed={0.1}
                squareSize={75}
                direction='diagonal'
                borderColor='#112a98ff'
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white">E-Voting</h1>
            </div>
        </section>
    );
}