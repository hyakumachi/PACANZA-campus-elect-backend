import { Injectable } from '@nestjs/common';
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
}
