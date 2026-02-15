import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';
import TiltedCard from '@/components/TiltedCard';

export default function Voting() {
    const candidate = [
        {
            id: 1,
            name: 'Candidate 1',
            image: '/img/kandidat/kandidat.png',
            description: 'Candidate 1 Description',
        },
        {
            id: 2,
            name: 'Candidate 2',
            image: '/img/kandidat/kandidat2.png',
            description: 'Candidate 2 Description',
        },
        {
            id: 3,
            name: 'Candidate 3',
            image: '/img/kandidat/kandidat3.png',
            description: 'Candidate 3 Description',
        },
    ];

    return (
        <>
            <Head title="Voting">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Layout>
                <div className="center flex-col gap-4 w-full max-w-6xl py-12">
                    {/* Header */}
                    <div className="bg-white text-blue-950 px-14 py-6 w-full rounded-2xl center flex-col">
                        <h3 className="text-4xl font-semibold tracking-tight">Vote Your <span className="text-blue-800">Best Candidate</span></h3>
                        <p className="text-lg leading-relaxed">Geser kartu kandidat untuk melihat kandidat lainnya. Klik kartu untuk melihat detail kandidat.</p>
                    </div>

                    {/* Card Candidate */}
                    <div className="bg-white text-blue-950 px-14 py-8 w-full rounded-2xl center gap-8">
                        {candidate.map((item) => (
                            <TiltedCard>
                                <div key={item.id} className="cursor-pointer bg-white text-blue-950 w-full rounded-2xl center flex-col gap-2 rounded-md overflow-hidden">
                                    <img src={`/storage/${item.image}`} alt={item.name} className="w-full aspect-[3/4]" />
                                </div>
                            </TiltedCard>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}