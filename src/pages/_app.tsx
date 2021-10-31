import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import DefaultLayout from '../components/layout/DefaultLayout';
import 'focus-visible';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    let vw = window.innerWidth;
    window.addEventListener('resize', () => {
      if (vw === window.innerWidth) return;

      vw = window.innerWidth;
      setFillHeight();
    });

    setFillHeight();
  }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
