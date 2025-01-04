import Head from 'next/head';
import Matrix from '../components/Matrix';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Index() {
    return (
        <div className="bg-black text-white h-screen">
            <Head>
                <title>Matrix reduction practice</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Matrix/>
            <Footer/>
        </div>
    );
}
