import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from '../student/student.service';
import { Lesson } from './lesson.entity';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonType)
  assingStudentsToLesson(
    @Args('assingStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;

    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField() // This s the resolver for the students field
  async students(@Parent() lesson: Lesson) {
    // Resolve this field for the lesson entity, the return value will resolve the field
    return this.studentService.getManyStudents(lesson.students);
  }
}
