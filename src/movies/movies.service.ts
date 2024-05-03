import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MoviesService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>
  ) { }

  async create(movieDto: MovieDto) {
    if (movieDto.rating < 0 || movieDto.rating > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }

    const currentYear = new Date().getFullYear();
    if (movieDto.releaseYear < 1900 || movieDto.releaseYear > currentYear) {
      throw new Error(`Release year must be between 1900 and ${currentYear}.`);
    }

    const movie = this.moviesRepository.create(movieDto);

    return await this.moviesRepository.save(movie);
  }


  async findAll() {
    return await this.moviesRepository.find();
  }

  async findOne(id: string) {
    return await this.moviesRepository.findOne({ where: { id } })
  }

  async update(id: string, movieDto: MovieDto) {
    const movie = await this.findOne(id)

    if (!movie) {
      throw new NotFoundException()
    }

    Object.assign(movie, movieDto)

    return await this.moviesRepository.save(movie)
  }

  async remove(id: string) {
    const movie = await this.findOne(id)

    if (!movie) {
      throw new NotFoundException()
    }

    return await this.moviesRepository.remove(movie)
  }
}
