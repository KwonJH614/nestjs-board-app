import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  // TypeORM 0.2 version
  // async deleteBoard(id: number): Promise<void> {
  //  const result = await this.boardRepository.delete(id);
  //  console.log('result', result);
  // }

  // TypeORM 0.3 version
  async deleteBoard(id : number): Promise<void> {
    const result = await this.boardRepository.deleteBoard(id); 
  }

  updateBoardStatus(id : number, status : BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }
}
