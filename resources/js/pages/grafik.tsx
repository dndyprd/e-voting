import { Head, router } from '@inertiajs/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Layout from '@/components/layout';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface CandidateVote {
    name: string;
    votes_count: number;
}

export default function Grafik({ candidates }: { candidates: CandidateVote[] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto refresh every 1 minute
    useEffect(() => {
        const interval = setInterval(() => {
            handleRefresh();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        router.reload({ only: ['candidates'] });
    };

    const labels = candidates.map(c => c.name);
    const values = candidates.map(c => c.votes_count);

    const colorPalette = [
        '#0747d0', // Blue 600
        '#009eed', // Sky 600
        '#009f3a', // Green 600
        '#f5c518', // Yellow 600
        '#f57c00', // Orange 600
        '#f44336', // Red 600
        '#e91e63', // Pink 600
        '#673ab7', // Violet 600
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total Vote',
                data: values,
                backgroundColor: values.map((_, index) => colorPalette[index % colorPalette.length]),
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%', // Thinner ring
        plugins: {
            legend: {
                position: isMobile ? 'bottom' as const : 'right' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            datalabels: {
                display: !isMobile,
                color: '#fff',
                font: {
                    weight: 'bold' as const,
                    size: 14
                },
                formatter: (value: number, ctx: Context) => {
                    const total = (ctx.chart.data.datasets[0].data as number[]).reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    return percentage;
                },
                anchor: 'end' as const,
                align: 'start' as const,
                offset: 10,
            }
        },
        layout: {
            padding: 20
        }
    };

    return (
        <>
            <Head title="Voting">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Layout>
                <div className="center flex-col gap-4 w-full max-w-6xl py-12">
                    {/* Header */}
                    <div className="center bg-white text-blue-950 px-4 md:px-10 gap-2 md:gap-4 w-full rounded-2xl shadow-sm">
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/19d8ecb3-9cc5-4ee2-bd17-8631d22bc0d9/YT6el0Kop0.json"
                            className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                        />
                        <div className="flex flex-col py-4 md:p-0 md:gap-2">
                            <h3 className="text-lg md:text-4xl font-semibold tracking-tight">Lihat Perolehan Suara <span className="text-blue-800">Kandidat Favoritmu</span> !</h3>
                            <p className="text-sm md:text-lg">Pantau terus perolehan suara kandidat favoritmu dan berikan dukungan juga yaa!</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {/* Chart */}
                        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[200px] md:min-h-[400px]">
                            <div className="w-full h-[400px] relative">
                                <Doughnut data={data} options={options} />
                            </div>
                        </div>

                        {/* Refresh & Info */}
                        <div className="flex flex-col">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col gap-2">
                                <div className="flex gap-3 text-blue-900 p-2 rounded-xl">
                                    <i className="fa-solid fa-circle-info mt-1 text-lg"></i>
                                    <p className="text-sm font-medium leading-relaxed">
                                        Grafik ini tidak realtime. Jadi, perlu refresh untuk memperbahahuinya.
                                    </p>
                                </div>

                                <button
                                    onClick={handleRefresh}
                                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 center gap-2 active:scale-95"
                                >
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                    Refresh Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}