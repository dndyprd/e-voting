import { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface TimerProps {
    startDate: string | null;
    endDate: string | null;
}

export const Timer = ({ startDate, endDate }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
    const [status, setStatus] = useState<'waiting' | 'running' | 'ended'>('waiting');

    useEffect(() => {
        if (!startDate || !endDate) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            let targetTime = 0;
            if (now < start) {
                setStatus('waiting');
                targetTime = start;
            } else if (now < end) {
                setStatus('running');
                targetTime = end;
            } else {
                setStatus('ended');
                setTimeLeft(null);
                clearInterval(timer);
                return;
            }

            const difference = targetTime - now;

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [startDate, endDate]);

    if (status === 'ended') {
        return (
            <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(8,112,184,0.1)] border border-blue-50/50 flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-500">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full center mb-2">
                    <i className="fa-solid fa-calendar-check text-xl"></i>
                </div>
                <h5 className="text-xl font-bold text-slate-800">SESI SELESAI</h5>
                <p className="text-sm text-slate-500 text-center leading-relaxed font-medium">Sesi voting telah berakhir.</p>
            </div>
        );
    }

    if (!timeLeft) return null;

    const labels = {
        waiting: {
            title: 'COMING SOON',
            desc: 'Voting akan berlangsung dalam'
        },
        running: {
            title: 'VOTING DIBUKA',
            desc: 'Voting berakhir dalam'
        }
    };

    const currentLabels = labels[status as keyof typeof labels];

    return (
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border flex flex-col items-center gap-6 group transition-all duration-500">
            <div className="flex flex-col items-center gap-1 text-sm md:text-base">
                <h5 className={`font-semibold ${status === 'running' ? 'text-blue-600' : 'text-amber-600'}`}>
                    {currentLabels.title}
                </h5>
                <p className="text-slate-500 font-medium">
                    {currentLabels.desc}
                </p>
            </div>

            <div className="flex gap-3 md:gap-4">
                {[
                    { label: 'Hari', value: timeLeft.days },
                    { label: 'Jam', value: timeLeft.hours },
                    { label: 'Menit', value: timeLeft.minutes },
                    { label: 'Detik', value: timeLeft.seconds },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-700 rounded-lg md:rounded-xl center transition-all duration-500">
                            <span className="text-white text-lg md:text-xl font-bold">
                                {String(item.value).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}