'use client'
import React, { useState } from 'react';
import cls from "./mainComponent.module.scss";

// Rajapinta laskentatuloksille
interface AdjustmentResult {
    rearToeAngle_deg: string;
    laserShiftAtFrontAxle_mm: string;
    desiredFrontToeAngle_deg: string;
    adjustmentDirection: string;
    adjustmentAmount: string;
    adjustedFrontToeInPerWheel_mm_raw: number;
}

// Pääkomponentti sovellukselle
const MainComponent = () => {
    // Tilamuuttujat syötteille
    const [rearToeInTotal, setRearToeInTotal] = useState(''); // Kokonaisauraus takapyörissä (mm)
    const [wheelbase, setWheelbase] = useState(''); // Akseliväli (mm)
    const [wheelDiameter, setWheelDiameter] = useState(''); // Vanteen koko (tuumat)
    const [desiredFrontToeInTotal, setDesiredFrontToeInTotal] = useState(''); // Toivottu etupyörien kokonaisauraus (mm)

    // Tilamuuttujat laskentatuloksille, määritelty tyyppi
    const [adjustmentResult, setAdjustmentResult] = useState<AdjustmentResult | null>(null);
    const [error, setError] = useState('');

    // Vakio tuumien muuntamiseen millimetreiksi
    const INCH_TO_MM = 25.4;
    const PI = Math.PI;

    // Käsittelee laskentapainikkeen painalluksen
    const handleCalculate = () => {
        // Nollaa virheet ja tulokset
        setError('');
        setAdjustmentResult(null);

        // Muunna syötteet numeroiksi
        const rearToeInTotal_num = parseFloat(rearToeInTotal);
        const wheelbase_num = parseFloat(wheelbase);
        const wheelDiameter_num = parseFloat(wheelDiameter);
        const desiredFrontToeInTotal_num = parseFloat(desiredFrontToeInTotal);

        // Tarkista syötteiden kelvollisuus
        if (
            isNaN(rearToeInTotal_num) ||
            isNaN(wheelbase_num) ||
            isNaN(wheelDiameter_num) ||
            isNaN(desiredFrontToeInTotal_num) ||
            wheelbase_num <= 0 ||
            wheelDiameter_num <= 0
        ) {
            setError('Tarkista syötteet. Kaikkien kenttien tulee olla numeroita ja akselivälin sekä vanteen halkaisijan positiivisia.');
            return;
        }

        try {
            // 1. Muunna vanteen halkaisija tuumista millimetreiksi
            const wheelDiameter_mm = wheelDiameter_num * INCH_TO_MM;

            // 2. Laske yhden takapyörän aurauksen kulma
            // Oletetaan, että kokonaisauraus jakautuu tasan molemmille pyörille
            const rearToeInPerWheel_mm = rearToeInTotal_num / 2;
            const rearToeAngle_rad = Math.atan(rearToeInPerWheel_mm / wheelDiameter_mm);
            const rearToeAngle_deg = rearToeAngle_rad * (180 / PI);

            // 3. Laske laserlinjan sivuttaissiirtymä etuakselin kohdalla
            // Tämä kuvaa takapyörän aurauksen vaikutusta laserlinjaan akselivälin yli.
            const laserShiftAtFrontAxle_mm = Math.tan(rearToeAngle_rad) * wheelbase_num;

            // 4. Laske yhden etupyörän toivotun aurauksen kulma
            const desiredFrontToeInPerWheel_mm = desiredFrontToeInTotal_num / 2;
            const desiredFrontToeAngle_rad = Math.atan(desiredFrontToeInPerWheel_mm / wheelDiameter_mm);
            const desiredFrontToeAngle_deg = desiredFrontToeAngle_rad * (180 / PI);

            // 5. Määritä etupyörän säädetty auraus suhteessa laserlinjaan
            // Haluttu etupyörän kulma (todelliseen keskiviivaan nähden) - takapyörän laserlinjan kulma
            const adjustedFrontAngle_rad = desiredFrontToeAngle_rad - rearToeAngle_rad;

            // 6. Muunna säädetty kulma takaisin millimetreiksi (mitattuna vanteen halkaisijan yli)
            // Tämä on se arvo, jonka mittaat etupyörän etu- ja takareunan välillä laserlinjaan nähden.
            const adjustedFrontToeInPerWheel_mm = Math.tan(adjustedFrontAngle_rad) * wheelDiameter_mm;

            // 7. Tulkitse tulos
            let adjustmentDirection = '';
            let adjustmentAmount = Math.abs(adjustedFrontToeInPerWheel_mm).toFixed(2); // Pyöristä 2 desimaaliin

            if (adjustedFrontToeInPerWheel_mm > 0) {
                adjustmentDirection = 'aurausta (etureuna lähempänä kuin takareuna)';
            } else if (adjustedFrontToeInPerWheel_mm < 0) {
                adjustmentDirection = 'haritusta (etureuna kauempana kuin takareuna)';
            } else {
                adjustmentDirection = 'ei säätöä tarvita';
                adjustmentAmount = '0.00';
            }

            setAdjustmentResult({
                rearToeAngle_deg: rearToeAngle_deg.toFixed(3),
                laserShiftAtFrontAxle_mm: laserShiftAtFrontAxle_mm.toFixed(2),
                desiredFrontToeAngle_deg: desiredFrontToeAngle_deg.toFixed(3),
                adjustmentDirection,
                adjustmentAmount,
                adjustedFrontToeInPerWheel_mm_raw: adjustedFrontToeInPerWheel_mm // Raaka arvo tarkistusta varten
            });

        } catch (e) {
            setError('Laskennassa tapahtui virhe. Yritä uudelleen.');
            console.error(e);
        }
    };

    return (
        <div className={cls.container}>
            <div className={cls.card}>
                <h1 className={cls.title}>
                    Pyöränsuuntauksen laskuri
                </h1>

                <div className={cls.inputGrid}>
                    {/* Takapyörien kokonaisauraus */}
                    <div className={cls.inputGroup}>
                        <label htmlFor="rearToeInTotal" className={cls.label}>
                            Takapyörien kokonaisauraus (mm):
                        </label>
                        <input
                            type="number"
                            id="rearToeInTotal"
                            value={rearToeInTotal}
                            onChange={(e) => setRearToeInTotal(e.target.value)}
                            placeholder="esim. 1.71"
                            className={cls.inputField}
                        />
                    </div>

                    {/* Akseliväli */}
                    <div className={cls.inputGroup}>
                        <label htmlFor="wheelbase" className={cls.label}>
                            Akseliväli (mm):
                        </label>
                        <input
                            type="number"
                            id="wheelbase"
                            value={wheelbase}
                            onChange={(e) => setWheelbase(e.target.value)}
                            placeholder="esim. 2675"
                            className={cls.inputField}
                        />
                    </div>

                    {/* Vanteen koko */}
                    <div className={cls.inputGroup}>
                        <label htmlFor="wheelDiameter" className={cls.label}>
                            Vanteen koko (tuumat):
                        </label>
                        <input
                            type="number"
                            id="wheelDiameter"
                            value={wheelDiameter}
                            onChange={(e) => setWheelDiameter(e.target.value)}
                            placeholder="esim. 16"
                            className={cls.inputField}
                        />
                    </div>

                    {/* Toivottu etupyörien kokonaisauraus */}
                    <div className={cls.inputGroup}>
                        <label htmlFor="desiredFrontToeInTotal" className={cls.label}>
                            Toivottu etupyörien kokonaisauraus (mm):
                        </label>
                        <input
                            type="number"
                            id="desiredFrontToeInTotal"
                            value={desiredFrontToeInTotal}
                            onChange={(e) => setDesiredFrontToeInTotal(e.target.value)}
                            placeholder="esim. 2.0"
                            className={cls.inputField}
                        />
                    </div>
                </div>

                {/* Laskentapainike */}
                <button
                    onClick={handleCalculate}
                    className={cls.calculateButton}
                >
                    Laske säätö
                </button>

                {/* Virheviesti */}
                {error && (
                    <div className={cls.errorMessage}>
                        {error}
                    </div>
                )}

                {/* Tulokset */}
                {adjustmentResult && (
                    <div className={cls.resultContainer}>
                        <h2 className={cls.resultTitle}>Laskennan tulokset</h2>
                        <div className={cls.resultDetails}>
                            <p>
                                <span className={cls.resultLabel}>Takapyörän aurauskulma (per pyörä):</span>{' '}
                                {adjustmentResult.rearToeAngle_deg} astetta
                            </p>
                            <p>
                                <span className={cls.resultLabel}>Laserlinjan siirtymä etuakselin kohdalla:</span>{' '}
                                {adjustmentResult.laserShiftAtFrontAxle_mm} mm (sisäänpäin, jos takapyörä auraa)
                            </p>
                            <p>
                                <span className={cls.resultLabel}>Toivottu etupyörän aurauskulma (per pyörä):</span>{' '}
                                {adjustmentResult.desiredFrontToeAngle_deg} astetta
                            </p>
                            <div className={cls.adjustmentSummary}>
                                <p className={cls.adjustmentTitle}>
                                    Säätö laserlinjaan nähden (per etupyörä):
                                </p>
                                <p className={cls.adjustmentAmount}>
                                    {adjustmentResult.adjustmentAmount} mm {adjustmentResult.adjustmentDirection}
                                </p>
                                <p className={cls.adjustmentNote}>
                                    (Tämä on ero vanteen etu- ja takareunan välillä, kun mittaat laserilla takapyörästä.)
                                </p>
                            </div>
                        </div>
                        <div className={cls.disclaimer}>
                            <p>
                                Positiivinen auraus (toe-in) tarkoittaa, että renkaiden etureunat ovat lähempänä toisiaan kuin takareunat.
                                Negatiivinen auraus (haritus/toe-out) tarkoittaa, että renkaiden etureunat ovat kauempana toisistaan kuin takareunat.
                            </p>
                            <p className={cls.disclaimerText}>
                                <b>**Huom:**</b> Tämä laskuri antaa ohjeellisen arvon. Tarkka pyöränsuuntaus vaatii ammattilaitteistoa,
                                joka huomioi kaikki ajoneuvon geometriset kulmat, kuten työntökulman. Kotikonstein tehty säätö
                                on aina karkeampi ja voi vaatia useita kokeiluja. <b>Tämän appilikaation käyttö, pyöräkulmien säätäminen sekä muu hölmöily on täysin käyttäjän omalla vastuulla.</b>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainComponent;
