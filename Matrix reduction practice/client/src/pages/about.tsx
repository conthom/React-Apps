import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
export default function About() {
    return (
        <div className="bg-black text-white h-screen">
            <Head>Matrix reduction practice
                <title></title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        <Header/>
        <div className="flex justify-center items-center h-full">
            <Image src="/meme.jpg" alt="Meme" className="w-3/4 h-3/4 object-contain" />
        </div>
        <Footer/>
        </div>
    );
}
