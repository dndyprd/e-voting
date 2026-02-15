import { Head } from '@inertiajs/react';
import Layout from '@/components/layout';

export default function Voting() {
    return (
        <>
            <Head title="Voting">
                <link rel="preconnect" href="https://fonts.bunny.net" />
            </Head>
            <Layout>
                <div>
                    <h1>Voting</h1>
                </div>
            </Layout>
        </>
    );
}