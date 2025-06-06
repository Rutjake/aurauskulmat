// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#ff0000', marginBottom: '20px' }}>Sivua ei löytynyt (404)</h2>
      <p style={{ marginBottom: '20px' }}>Valitettavasti pyytämääsi sivua ei löytynyt palvelimelta.</p>
      <Link href="/" style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Palaa etusivulle
      </Link>
    </div>
  );
}