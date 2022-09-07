import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BookModule, TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
