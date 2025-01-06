import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

export default function Index() {
    return (
        <div className="bg-black text-white h-screen">
            <Head>
                <title>Matrix reduction practice</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}
