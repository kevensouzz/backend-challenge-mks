import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: "JWT_SECRET",
      signOptions: {
        expiresIn: '2h'
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
