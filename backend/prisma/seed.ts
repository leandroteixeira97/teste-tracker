/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@crmtracker.com' },
        update: {},
        create: {
            email: 'admin@crmtracker.com',
            name: 'Administrador',
            role: 'ADMINISTRATOR',
            passwordHash: '123456',
        },
    });

    const sellerUser = await prisma.user.upsert({
        where: { email: 'vendedor@crmtracker.com' },
        update: {},
        create: {
            email: 'vendedor@crmtracker.com',
            name: 'Vendedor',
            role: 'SELLER',
            passwordHash: '123456',
        },
    });

    const attendantUser = await prisma.user.upsert({
        where: { email: 'atendente@crmtracker.com' },
        update: {},
        create: {
            email: 'atendente@crmtracker.com',
            name: 'Atendente',
            role: 'ATTENDANT',
            passwordHash: '123456',
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
