import { ImageResponse } from 'next/og';

export const alt = "Éditions Cerises d'Hiver — Maison d'édition indépendante";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image de partage par défaut, reprise par les pages qui n'ont pas la leur.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#FDEEE8',
          color: '#1f2937',
          padding: '80px',
          borderLeft: '16px solid #E91E63',
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 4, color: '#C2185B' }}>MAISON D&apos;ÉDITION INDÉPENDANTE</div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, marginTop: 28, fontFamily: 'serif' }}>
          Éditions Cerises d&apos;Hiver
        </div>
        <div style={{ fontSize: 40, marginTop: 36, color: '#4b5563' }}>Romans et littérature contemporaine</div>
      </div>
    ),
    { ...size },
  );
}
