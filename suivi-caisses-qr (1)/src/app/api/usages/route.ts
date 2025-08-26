
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = (session.user as any).id as string;
  const body = await req.json();
  const created = await prisma.caseUsage.create({
    data: {
      caseId: body.caseId,
      techId: userId,
      clientId: body.clientId,
      notes: body.notes,
      damage: !!body.damage,
      damageDetails: body.damage ? body.damageDetails : null,
      locationLat: body.locationLat ?? null,
      locationLng: body.locationLng ?? null
    }
  });
  await prisma.case.update({ where: { id: body.caseId }, data: { lastScanAt: created.scannedAt, status: body.damage ? 'MAINTENANCE' : 'IN_USE' } });
  return NextResponse.json(created);
}
