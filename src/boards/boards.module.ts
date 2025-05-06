import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  providers: [BoardsService, BoardRepository],
  controllers: [BoardsController],
  exports: [BoardsService],
})
export class BoardsModule {}
