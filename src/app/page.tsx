'use client';
import Head from 'next/head';
import MainComponent from './components/mainComponent/mainComponent';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pyöränsuuntauksen laskuri</title>
        <meta name="description" content="Laske pyöränsuuntauksen säädöt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainComponent />
      </main>
    </div>
  );
};
