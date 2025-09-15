'use client';
import dynamic from 'next/dynamic';

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then(m => m.Scanner),
  { ssr: false }
);

export default function QRScanner({ onResult }: { onResult: (text: string) => void }) {
  return (
    <Scanner
      onScan={detectedCodes => onResult(detectedCodes[0]?.rawValue ?? '')}
    />
  );
}
