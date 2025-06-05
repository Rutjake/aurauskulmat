'use client';
import Head from 'next/head';
import UserManualComponent from '../../components/userManualComponent/userManualComponent';

export default function Manual() {
    return (
        <div>
            <Head>
                <title>Pyöränsuuntauksen laskuri</title>
                <meta name="description" content="Miten käyttää sovelluksen tulosta mittauksessa" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
               <UserManualComponent />
            </main>
        </div>
    );

}