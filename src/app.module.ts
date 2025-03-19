import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormORMConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmModule.forRoot(typeormORMConfig),
    BoardsModule,
    AuthModule
  ],
})
export class AppModule {}
