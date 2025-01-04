import '@/styles/styles.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}