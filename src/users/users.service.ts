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
    const token = await this.jwtService.signAsync(payload)

    return {
      token: token
    }
  }

  async register(UserDto: UserDto) {
    const userExists = await this.usersRepository.existsBy({ username: UserDto.username });

    if (userExists) {
      throw new ConflictException("Username already exists!");
    }

    const hashedPassword = await bcrypt.hash(UserDto.password, 10);
    const user = this.usersRepository.create({ ...UserDto, password: hashedPassword });
    await this.usersRepository.save(user);

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token
    };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
      return await this.usersRepository.findOne({ where: { id } })
  }

  async update(id: string, userDto: UserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    if (userDto.username && userDto.username !== user.username) {
      const existingUser = await this.usersRepository.findOne({ where: { username: userDto.username } });
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    }

    if (userDto.password) {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      userDto.password = hashedPassword;
    }

    Object.assign(user, userDto)

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
