
'use client';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import QRScanner from '@/components/QRScanner';

export default function ScanPage() {
  const router = useRouter();
  const onResult = async (qr: string) => {
    const res = await fetch(`/api/cases?qr=${encodeURIComponent(qr)}`);
    const data = await res.json();
    if (data?.id) router.push(`/cases/${data.id}?action=open`);
    else alert('Caisse introuvable pour ce QR');
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4">Scanner une caisse</h1>
      <QRScanner onResult={onResult} />
    </div>
  );
}
