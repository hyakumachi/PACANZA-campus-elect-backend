import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { ReturnedStudentDto } from 'src/users/dto/students.dto';
import { CreateStudentDto } from 'src/users/dto/students.dto';
import { Student } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('students')
  @ApiOperation({
    summary: 'Get all students',
    description: 'Returns a list of all students in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of students retrieved successfully.',
    type: [ReturnedStudentDto],
  })
  async findAllStudents(): Promise<Student[]> {
    return await this.usersService.findAllStudents();
  }

  @Get('students/find')
  @ApiOperation({
    summary: 'Finds students by ID',
    description: 'Returns a student that matches the provided ID.',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'The unique identifier of the student to find.',
    example: 'STUDENT_1',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Student found successfully.',
    type: ReturnedStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Student not found.',
  })
  async findStudentById(
    @Query('id') id: Student['studentId'],
  ): Promise<Student> {
    return await this.usersService.findStudentById({
      id: id,
    });
  }

  /**
   * Creates a new student.
   *
   * @param createStudentDto - The student data from the request body.
   * @returns The created student object.
   *
   * Status codes:
   * - 201: Student created successfully
   * - 400: Bad request (invalid or missing data)
   * - 401: Unauthorized (authentication required)
   * - 403: Forbidden (not enough permissions)
   * - 404: Related resource not found (e.g., department missing)
   * - 409: Conflict (student with ID already exists)
   * - 500: Server error
   */
  @Post('students')
  @ApiOperation({
    summary: 'Create a new student',
    description: 'Creates a new student with the provided details.',
  })
  @ApiCreatedResponse({
    description: 'Student created successfully.',
    type: ReturnedStudentDto,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Invalid or missing data in the request body. (Wrong format, missing fields, etc.)',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized. Authentication is required to create a student.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden. You do not have permission to create a student.',
  })
  @ApiConflictResponse({
    description: 'Conflict. Student with this ID already exists.',
  })
  @ApiNotFoundResponse({
    description: 'Student not found or does not exist.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error. Something went wrong on the server.',
  })
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return await this.usersService.createStudent(createStudentDto);
  }
}
