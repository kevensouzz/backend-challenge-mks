import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("movies")
@Controller('movies')
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
