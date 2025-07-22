import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './modules/author/author.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowModule } from './modules/borrow/borrow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CoreModule,
    UsersModule,
    AuthorModule,
    BooksModule,
    BorrowModule,
  ],
})
export class AppModule {}
