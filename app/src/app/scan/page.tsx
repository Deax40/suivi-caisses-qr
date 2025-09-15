'use client';
import { useState } from 'react';
import { useTools } from '@/context/ToolContext';
import QRScanner from '@/components/QRScanner';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ScanPage() {
  const { tools, updateTool, addTool } = useTools();
  const { data: session } = useSession();
  const [hash, setHash] = useState<string | null>(null);
  const tool = tools.find(t => t.hash === hash);
  const [form, setForm] = useState({
    name: tool?.name || '',
    location: tool?.location || '',
    status: tool?.status || '',
    notes: tool?.notes || ''
  });

  const onResult = (qr: string) => {
    setHash(qr);
    const found = tools.find(t => t.hash === qr);
    if (found) {
      setForm({
        name: found.name,
        location: found.location,
        status: found.status,
        notes: found.notes
      });
    } else {
      setForm({ name: '', location: '', status: '', notes: '' });
    }
  };

  const save = () => {
    if (!hash) return;
    if (tool) {
      updateTool(hash, form);
    } else if (session?.user.role === 'admin') {
      addTool({ hash, ...form, updatedAt: new Date().toISOString() });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Scan QR</h1>
      <QRScanner onResult={onResult} />
      {hash && (
        <div className="mt-4 space-y-2">
          {tool ? (
            <p>Outil : {tool.name}</p>
          ) : session?.user.role === 'admin' ? (
            <p>QR inconnu - ajout possible</p>
          ) : (
            <p>QR inconnu - ajout non autorisé</p>
          )}
          {(tool || session?.user.role === 'admin') && (
          <><input
            className="w-full border p-1"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Nom"
          />
          <input
            className="w-full border p-1"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="Localisation"
          />
          <input
            className="w-full border p-1"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            placeholder="État"
          />
          <textarea
            className="w-full border p-1"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
          />
          <button onClick={save} className="bg-green-600 text-white px-2 py-1">
            Enregistrer
          </button>
          </>)}
          <p>
            <Link href="/tools" className="text-blue-600 underline">
              Aller à Outils
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
