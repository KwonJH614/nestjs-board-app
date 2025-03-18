import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService, BoardRepository],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
