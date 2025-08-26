
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import NavBar from '@/components/NavBar';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const [casesCount, clientsCount, usagesCount] = await Promise.all([
    prisma.case.count(),
    prisma.client.count(),
    prisma.caseUsage.count()
  ]);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4">Aperçu</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Caisses" value={casesCount} />
        <Card title="Clients" value={clientsCount} />
        <Card title="Ouvertures" value={usagesCount} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
