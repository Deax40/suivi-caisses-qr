
import { prisma } from '@/lib/db';
import NavBar from '@/components/NavBar';

export default async function CasesPage() {
  const cases = await prisma.case.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4">Caisses</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {cases.map(c => (
          <a key={c.id} href={`/cases/${c.id}`} className="block bg-white rounded-2xl shadow p-4 hover:shadow-md">
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-gray-500">QR : {c.qrCode}</div>
            <div className="text-xs text-gray-500">Statut : {c.status}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
