import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Lesson') // Name this type
export class LessonType {
  // Graphql can dedece the ts types
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
