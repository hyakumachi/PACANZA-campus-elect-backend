import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Student } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * TS Doc/JS Doc
   * @Retrieves all students from the database.
   * @Returns a promise that resolves to an array of student objects.
   *
   */
  async findAllStudents(): Promise<Student[]> {
    return this.prisma.student.findMany();
  }
  /**
   *
   * @retrieves a student by their ID from the database.
   *
   */
  async findStudentById({
    id,
  }: {
    id: Student['studentId'];
  }): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: {
        studentId: id,
      },
    });

    if (!student) {
      // Use a NotFoundException for proper HTTP error handling
      // @see @nest/common
      throw new NotFoundException(`Student not found.`);
    }

    return student;
  }
}
