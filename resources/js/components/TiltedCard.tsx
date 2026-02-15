import type { MouseEvent } from "react";
import { useRef, useState } from "react";

export default function TiltedCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const card = ref.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setTransform(
            `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        );
    };

    const handleMouseLeave = () => {
        setTransform(
            `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
        );
    };

    return (
        <div
            ref={ref}
            className="h-full w-full transition-transform duration-200 ease-out"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
}