import '@/styles/styles.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}