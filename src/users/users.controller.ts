import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Public } from 'src/allow-anon.decorator';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags("users")
@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // swagger anotations
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  //
  @Public()
  @Post("login")
  login(@Body() userDto: UserDto) {
    return this.usersService.login(userDto);
  }

  // swagger anotations
  @ApiCreatedResponse()
  @ApiConflictResponse()
  //
  @Public()
  @Post("register")
  register(@Body() userDto: UserDto) {
    return this.usersService.register(userDto);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiConflictResponse()
  @ApiBearerAuth()
  //
  @Patch(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.usersService.update(id, userDto);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
