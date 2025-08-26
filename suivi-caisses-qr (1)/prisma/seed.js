
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const pwd = await bcrypt.hash('Admin@1234', 10);
  await prisma.user.upsert({
    where: { email: 'admin@exemple.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@exemple.com', passwordHash: pwd, role: 'ADMIN' }
  });

  const techPwd = await bcrypt.hash('Tech@1234', 10);
  await prisma.user.upsert({
    where: { email: 'tech1@exemple.com' },
    update: {},
    create: { name: 'Tech 1', email: 'tech1@exemple.com', passwordHash: techPwd, role: 'TECH' }
  });
  await prisma.user.upsert({
    where: { email: 'tech2@exemple.com' },
    update: {},
    create: { name: 'Tech 2', email: 'tech2@exemple.com', passwordHash: techPwd, role: 'TECH' }
  });

  await prisma.client.upsert({ where: { name: 'Client A' }, update: {}, create: { name: 'Client A' } });
  await prisma.client.upsert({ where: { name: 'Client B' }, update: {}, create: { name: 'Client B' } });

  await prisma.case.upsert({ where: { qrCode: 'QR-CASE-001' }, update: {}, create: { name: 'Caisse 001', qrCode: 'QR-CASE-001' } });
  await prisma.case.upsert({ where: { qrCode: 'QR-CASE-002' }, update: {}, create: { name: 'Caisse 002', qrCode: 'QR-CASE-002' } });

  console.log('Seed terminé.');
  console.log('Admin -> admin@exemple.com / Admin@1234');
  console.log('Tech  -> tech1@exemple.com / Tech@1234');
}

main().finally(async () => prisma.$disconnect());
