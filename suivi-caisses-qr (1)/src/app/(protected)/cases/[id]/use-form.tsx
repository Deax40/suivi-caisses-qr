
'use client';
import { useEffect, useState } from 'react';

export default function CaseUseForm({ caseId, clients, autoOpen }: { caseId: string; clients: any[]; autoOpen?: boolean }) {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [damage, setDamage] = useState(false);
  const [damageDetails, setDamageDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (autoOpen) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    let locationLat: number | undefined; let locationLng: number | undefined;
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => navigator.geolocation?.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 4000 }));
      if (pos) { locationLat = pos.coords.latitude; locationLng = pos.coords.longitude; }
    } catch {}

    const res = await fetch('/api/usages', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId, clientId, damage, damageDetails: damage ? damageDetails : undefined, notes, locationLat, locationLng })
    });
    setLoading(false);
    if (res.ok) alert('Ouverture enregistrée');
    else alert('Erreur lors de l\'enregistrement');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-4 space-y-3">
      <div className="font-semibold">Ouvrir / utiliser cette caisse</div>
      <div>
        <label className="text-sm text-gray-600">Client</label>
        <select className="w-full border rounded-xl px-3 py-2" value={clientId} onChange={e=>setClientId(e.target.value)}>
          {clients.map((c:any)=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input id="damage" type="checkbox" checked={damage} onChange={e=>setDamage(e.target.checked)} />
        <label htmlFor="damage">Dégâts constatés</label>
      </div>
      {damage && (
        <textarea className="w-full border rounded-xl px-3 py-2" placeholder="Détails des dégâts" value={damageDetails} onChange={e=>setDamageDetails(e.target.value)} />
      )}
      <textarea className="w-full border rounded-xl px-3 py-2" placeholder="Notes (optionnel)" value={notes} onChange={e=>setNotes(e.target.value)} />
      <button disabled={loading} className="rounded-xl px-4 py-2 bg-black text-white">{loading ? '…' : 'Enregistrer'}</button>
    </form>
  );
}
