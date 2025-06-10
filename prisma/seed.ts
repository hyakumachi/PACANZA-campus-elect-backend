import { PrismaClient } from "@prisma/client";

async function seedElections() {
    const election25 = await prisma.election.upsert({
        where: { id: 'election-2025' },
        update: {},
        create: {
            id: 'election-2025',
            name: 'Election 2025',
            startDate: new Date('2025-05-26T23:00:00Z'),
            endDate: new Date('2025-06-26T23:59:59Z'),
            description: 'University Student Council Elections 2025',
            isActive: true
        }
    })
}

const prisma = new PrismaClient();

async function main() {
    console.log("SEEDING DATABASE...");

    await seedElections();

    console.log("FINISHED SEEDING");
}

void main()