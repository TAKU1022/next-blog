import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import DefaultLayout from '../components/layout/DefaultLayout';
import 'focus-visible';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');

    const switchViewport = () => {
      const value =
        window.outerWidth > 360
          ? 'width=device-width,initial-scale=1'
          : 'width=360';
      if (viewport?.getAttribute('content') !== value) {
        viewport?.setAttribute('content', value);
      }
    };

    window.addEventListener('resize', switchViewport);
    switchViewport();
  }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
