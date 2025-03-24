import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Param, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


// Default Repository
@Injectable()
export class AuthService {
  constructor( 
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private jwtService : JwtService,
  ) {}  

  async signUp(authDto : AuthDto): Promise<void> {
    const{ username, password} = authDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({ username, password : hashedPassword });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authDto : AuthDto): Promise<{accessToken : string}> {
    const { username, password } = authDto;

    // TypeORM 0.2 version
    // const user = this.userRepository.findOne({username});

    // TypeORM 0.3 version
    const user = await this.userRepository.findOne({
      where : { username : username }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

}
