# Pyöräsuuntauksen laskuri
<img width="1272" height="1076" alt="image" src="https://github.com/user-attachments/assets/00149434-7812-4c05-9041-7be470150481" />




Työkalu toimii apuna kun ajoneuvon etupyörien aurausta säädetään kotioloissa.

## Miten käyttää sovelluksen tulosta mittauksessa
Kun asennat laserin takavanteen linjaan esimerkiksi 10cm päähän vanteesta (ja otat 10 cm etäisyyden huomioon, vaikka se ei suoraan vaikutakaan aurauksen mittaukseen vanteen etu- ja takareunasta, vaan laserin linjan asetteluun), ja mittaat sitten etuvanteen etu- ja takareunasta, sovelluksen antama luku kertoo sinulle, paljonko näiden kahden mittauksen tulisi poiketa toisistaan.

Sovelluksen tulos "Säätö laserlinjaan nähden (per etupyörä)" ilmoittaa:

- **Arvo millimetreinä:** Erotuksen, jonka etupyörän etu- ja takareunojen mittauksissa tulee olla.
- **Suunta (aurausta / haritusta):** Kertoo, kumpi reuna on lähempänä tai kauempana laserlinjasta.
  
### Käytännössä se toimii näin:

**1. Aurausta (toe-in):** Jos sovellus antaa tulokseksi esimerkiksi "X mm aurausta", se tarkoittaa, että etupyörän **etureunan tulee olla X mm kauempana laserlinjasta** kuin saman etupyörän takareunan.
- Jos esimerkiksi mittaat laserlinjasta etupyörän **takareunaan 100 mm**, ja sovellus sanoo "1 mm aurausta per pyörä", silloin etupyörän **etureunaan tulee mitata 101 mm**.
- (Etureuna 101 mm ja Takareuna 100 mm = +1 mm, mikä tarkoittaa 1 mm aurausta per pyörä.)
 
**2. Haritusta (toe-out):** Jos sovellus antaa tulokseksi esimerkiksi "Y mm haritusta", se tarkoittaa, että etupyörän **etureunan tulee olla Y mm lähempänä laserlinjaa** kuin saman etupyörän takareunan.
- Jos esimerkiksi mittaat laserlinjasta etupyörän **takareunaan 100 mm**, ja sovellus sanoo "1 mm haritusta per pyörä", silloin etupyörän **etureunaan tulee mitata 99 mm**.
- (Etureuna 99 mm ja Takareuna 100 mm = -1 mm, mikä tarkoittaa 1 mm haritusta per pyörä.)
  
Sovellus ottaa siis jo huomioon takapyörien aurauksen vaikutuksen ja antaa sinulle sen korjatun arvon, jonka sinun tulee mitata suoraan etupyörästä laserlinjaan nähden.

Muista, että tämä on per pyörä -luku. Jos haluat tarkistaa kokonaisaurauksen, sinun tulee tarkistaa molemmat etupyörät erikseen ja varmistaa, että ohjauspyörä on suorassa auton kulkiessa suoraan.

Applikaatiota voi kokeilla täällä:
https://rutjake.github.io/aurauskulmat/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

