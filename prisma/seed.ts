import { PrismaClient } from '@prisma/client';

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
      isActive: true,
    },
  });

  await prisma.position.upsert({
    where: { id: PRESIDENT25_ID },
    update: {},
    create: {
      id: PRESIDENT25_ID,
      title: 'President',
      Election: {
        connect: { id: election25.id },
      },
    },
  });
}

async function seedStudents() {
  await prisma.student.upsert({
    where: { studentId: 'STUDENT_1' },
    update: {},
    create: {
      studentId: 'STUDENT_1',
      email: 'mscmacapagal@addu.edu.ph',
      name: 'Matthew Sean C. Macapagal',
      department: 'School of Engineering and Architecture',
    },
  });

  await prisma.student.upsert({
    where: { studentId: 'STUDENT_2' },
    update: {},
    create: {
      studentId: 'STUDENT_2',
      email: 'kkbkawasaki@addu.edu.ph',
      name: 'Kazumiya Ken B. Kawasaki',
      department: 'Computer Studies',
    },
  });

  await prisma.student.upsert({
    where: { studentId: 'STUDENT_3' },
    update: {},
    create: {
      studentId: 'STUDENT_3',
      email: 'blspacanza@addu.edu.ph',
      name: 'Bernard Louie S. Pacanza',
      department: 'Computer Studies',
    },
  });
}

async function seedCandidates() {
  await prisma.candidate.upsert({
    where: { candidateId: 'CANDIDATE_1' },
    update: {},
    create: {
      candidateId: 'CANDIDATE_1',
      positionId: PRESIDENT25_ID,
      studentId: 'STUDENT_1',
    },
  });

  await prisma.candidate.upsert({
    where: { candidateId: 'CANDIDATE_2' },
    update: {},
    create: {
      candidateId: 'CANDIDATE_2',
      positionId: PRESIDENT25_ID,
      studentId: 'STUDENT_2',
    },
  });
}

const prisma = new PrismaClient();
const PRESIDENT25_ID = 'election-2025-president';

async function main() {
  console.log('SEEDING DATABASE...');

  await seedElections();
  await seedStudents();
  await seedCandidates();

  console.log('FINISHED SEEDING');
}

void main();
