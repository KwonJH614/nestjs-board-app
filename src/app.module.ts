import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormORMConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmModule.forRoot(typeormORMConfig),
    BoardsModule
  ],
})
export class AppModule {}
