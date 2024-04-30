import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(UserDto: UserDto) {
    const user = await this.usersRepository.findOne({ where: { username: UserDto.username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(UserDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username }

    return {
      token: await this.jwtService.signAsync(payload)
    }
  }

  async register(UserDto: UserDto) {
    try {
      const hashedPassword = await bcrypt.hash(UserDto.password, 10);

      const user = this.usersRepository.create({ ...UserDto, password: hashedPassword });
      await this.usersRepository.save(user);

      const payload = { sub: user.id, username: user.username }

      return {
        token: await this.jwtService.signAsync(payload)
      }

    } catch (error) {

      if (error.code === '23505' && error.detail.includes('already exists')) {
        throw new ConflictException('Username already exists');
      } else {
        throw error;
      }

    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } })
  }

  async update(id: string, UserDto: UserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    if (UserDto.password) {
      const hashedPassword = await bcrypt.hash(UserDto.password, 10);
      user.password = hashedPassword;
    }

    Object.assign(user, UserDto)

    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    return await this.usersRepository.remove(user);
  }
}
