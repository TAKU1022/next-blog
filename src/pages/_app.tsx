import type { AppProps } from 'next/app';
import DefaultLayout from '../components/layout/DefaultLayout';
import 'focus-visible';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
