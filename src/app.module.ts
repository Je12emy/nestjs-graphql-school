import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      synchronize: true,
      useUnifiedTopology: true, // required
      entities: [Lesson],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true, // save the schema in memory and regenerate it everytime
    }),
    LessonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
