'use client'
import React from 'react';
import cls from './userManual.module.scss';
import Link from 'next/link';
import Image from 'next/image'

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/aurauskulmat' : '';

const UserManualComponent = () => {
    return (
        <div className={cls.container}>
            <Link href="/" className={cls.textLink}>
                <Image
                    src={`${BASE_PATH}/icons/arrow_back.svg`}
                    alt="Takaisin"
                    width={20}
                    height={20}
                    style={{ verticalAlign: 'middle', marginRight: '0px' }}
                />
                Takaisin
            </Link>
            <div className={cls.card}>
                <h1 className={cls.title}>Miten käyttää sovelluksen tulosta mittauksessa</h1>
                <p className={cls.contentText}>
                    Kun asennat laserin takavanteen linjaan esimerkiksi 10cm päähän vanteesta (ja otat 10 cm etäisyyden huomioon, vaikka se ei suoraan vaikutakaan aurauksen mittaukseen vanteen etu- ja takareunasta, vaan laserin linjan asetteluun), ja mittaat sitten etuvanteen etu- ja takareunasta, sovelluksen antama luku kertoo sinulle, paljonko näiden kahden mittauksen tulisi poiketa toisistaan.
                </p>
                <p className={cls.contentText}>
                    Sovelluksen tulos &quot;Säätö laserlinjaan nähden (per etupyörä)&quot; ilmoittaa:
                </p>
                <ul className={cls.textList}>
                    <li>
                        <b>Arvo millimetreinä:</b> Erotuksen, jonka etupyörän etu- ja takareunojen mittauksissa tulee olla.
                    </li>
                    <li>
                        <b>Suunta (aurausta / haritusta):</b> Kertoo, kumpi reuna on lähempänä tai kauempana laserlinjasta.
                    </li>
                </ul>

                <p className={cls.contentTitle}>
                    Käytännössä se toimii näin:
                </p>
                <p className={cls.contentText}>
                    <b>1. Aurausta (toe-in):</b> Jos sovellus antaa tulokseksi esimerkiksi &quot;X mm aurausta&quot;, se tarkoittaa, että etupyörän <b>etureunan tulee olla X mm lähempänä laserlinjaa</b> kuin saman etupyörän takareunan.
                </p>
                <ul className={cls.textList}>
                    <li>
                        Jos esimerkiksi mittaat laserlinjasta etupyörän <b>takareunaan 100 mm</b>, ja sovellus sanoo &quot;2 mm aurausta&quot;, silloin etupyörän <b>etureunaan tulee mitata 98 mm</b>.
                    </li>
                    <li>
                        (Etureuna 98 mm - Takareuna 100 mm = -2 mm, mikä tarkoittaa 2 mm aurausta.)
                    </li>
                </ul>

                <p className={cls.contentText}>
                    <b>2. Haritusta (toe-out):</b> Jos sovellus antaa tulokseksi esimerkiksi &quot;Y mm haritusta&quot;, se tarkoittaa, että etupyörän <b>etureunan tulee olla Y mm kauempana laserlinjasta</b> kuin saman etupyörän takareunan.
                </p>
                <ul className={cls.textList}>
                    <li>
                        Jos esimerkiksi mittaat laserlinjasta etupyörän <b>takareunaan 100 mm</b>, ja sovellus sanoo &quot;1 mm haritusta&quot;, silloin etupyörän<b>etureunaan tulee mitata 101 mm</b>.
                    </li>
                    <li>
                        (Etureuna 101 mm - Takareuna 100 mm = +1 mm, mikä tarkoittaa 1 mm haritusta.)
                    </li>
                </ul>

                <p className={cls.contentText}>
                    Sovellus ottaa siis jo huomioon takapyörien aurauksen vaikutuksen ja antaa sinulle sen korjatun arvon, jonka sinun tulee mitata suoraan etupyörästä laserlinjaan nähden.
                </p>
                <p className={cls.contentText}>
                    Muista, että tämä on per pyörä -luku. Jos haluat tarkistaa kokonaisaurauksen, sinun tulee tarkistaa molemmat etupyörät erikseen ja varmistaa, että ohjauspyörä on suorassa auton kulkiessa suoraan.
                </p>
            </div>
        </div>
    )
}

export default UserManualComponent;