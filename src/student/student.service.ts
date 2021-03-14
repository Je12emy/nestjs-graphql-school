import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async createStudent(studentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = studentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return await this.studentRepository.save(student);
  }
  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    }); // This is a mongodb anotation for finding something
  }
}
