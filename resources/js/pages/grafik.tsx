import { Head, usePage, router } from '@inertiajs/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Auth } from '@/types';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Layout from '@/components/layout';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Grafik() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [refreshKey, setRefreshKey] = useState(0);

    // Auto refresh every 1 minute
    useEffect(() => {
        const interval = setInterval(() => {
            handleRefresh();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        router.reload({ only: ['candidate'] });
        setRefreshKey(prev => prev + 1);
    };

    const labels = ['Candidate 1', 'Candidate 2', 'Candidate 3'];
    const values = [3, 2, 4];

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
                position: 'right' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold' as const,
                    size: 14
                },
                formatter: (value: number, ctx: any) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
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
                            src="https://assets8.lottiefiles.com/packages/lf20_yMpiqXia1k.json"
                            className="rounded-full w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                        />
                        <div className="flex flex-col md:gap-2">
                            <h3 className="text-lg md:text-4xl font-semibold tracking-tight">Lihat Perolehan Suara <span className="text-blue-800">Kandidat Favoritmu</span> !</h3>
                            <p className="text-sm md:text-lg">Pantau terus perolehan suara kandidat favoritmu dan berikan dukungan juga yaa!</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {/* Chart */}
                        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                            <div className="w-full h-[300px] md:h-[400px] relative">
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