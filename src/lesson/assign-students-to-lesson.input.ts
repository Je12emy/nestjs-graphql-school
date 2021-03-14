import { InputType, ID, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID()
  @Field((type) => ID)
  lessonId: string;

  @IsUUID('4', { each: true }) // is uuid v4, validate each
  @Field((type) => [ID])
  studentIds: string[];
}
