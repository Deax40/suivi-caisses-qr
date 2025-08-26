
import { prisma } from '@/lib/db';
import NavBar from '@/components/NavBar';
import CaseUseForm from './use-form';

export default async function CasePage({ params, searchParams }: any) {
  const c = await prisma.case.findUnique({ where: { id: params.id } });
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });
  const usages = await prisma.caseUsage.findMany({ where: { caseId: params.id }, include: { tech: true, client: true }, orderBy: { scannedAt: 'desc' }, take: 10 });
  if (!c) return <div>Inconnue</div>;
  const openAction = searchParams?.action === 'open';
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{c.name}</h1>
        <span className="text-sm text-gray-500">QR : {c.qrCode}</span>
      </div>
      <p className="text-gray-600 mb-4">{c.description || '—'}</p>
      <CaseUseForm caseId={c.id} clients={clients} autoOpen={openAction} />
      <h2 className="mt-8 mb-2 font-semibold">Dernières ouvertures</h2>
      <div className="space-y-2">
        {usages.map(u => (
          <div key={u.id} className="bg-white rounded-xl shadow p-3 text-sm">
            <div><b>{u.client.name}</b> — {new Date(u.scannedAt).toLocaleString('fr-FR')}</div>
            <div>Par {u.tech.name} {u.damage ? '• 🚨 Dégâts déclarés' : ''}</div>
            {u.notes && <div className="text-gray-600">Notes : {u.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
