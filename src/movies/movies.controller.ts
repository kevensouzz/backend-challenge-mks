import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiBearerAuth()
@ApiTags("movies")
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Post()
  create(@Body() movieDto: MovieDto) {
    return this.moviesService.create(movieDto);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Patch(':id')
  update(@Param('id') id: string, @Body() movieDto: MovieDto) {
    return this.moviesService.update(id, movieDto);
  }

  // swagger anotations
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @ApiBearerAuth()
  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
