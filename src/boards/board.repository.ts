import { Repository, EntityRepository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly repository: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.repository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.repository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
      const found = await this.repository.findOne({ where: { id } });
  
      if (!found) {
        throw new NotFoundException(`Can't find Board with id ${id}`);
      }
  
      return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Can't find Board with id : ${id}`);
    } else {
      console.log('result', result);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    await this.repository.update(id, { status });
    const updatedBoard = await this.getBoardById(id);
    return updatedBoard;
  }

  async getAllBoard() {
    return this.repository.find();
  }
  
}
