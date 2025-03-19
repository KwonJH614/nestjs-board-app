import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Auth, Repository } from "typeorm";
import { AuthCreateDto } from "./dto/auth-create.dto";


// Default Repository
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(authCreateDto : AuthCreateDto): Promise<void> {
    const{ username, password} = authCreateDto;
    const user = this.repository.create({ username, password});

    try {
      await this.repository.save(user);
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }

  }


}