import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private repo: PrismaService){}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    if(!createMovieDto){
      throw new BadRequestException('Invalid input');
    }
    return await this.repo.movie.create({
      data: createMovieDto, 
    });
  }

  async findAll(): Promise<Movie[]> {
    return await this.repo.movie.findMany({
      include:{
        genre: true
      }
    });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.repo.movie.findUnique({
      where: { id},
      include:{
        genre: true,
      }
    })

    if (!movie){
      throw new NotFoundException(`Movie with id = ${id} is not found.`);
    }

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.repo.movie.findUnique({
      where: { id}
    })

    if (!movie){
      throw new NotFoundException(`Movie with id = ${id} is not found.`);
    }
    return await this.repo.movie.update({
      where: {id},
      data: updateMovieDto,
    });
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.repo.movie.findUnique({
      where: { id}
    })

    if (!movie){
      throw new NotFoundException(`Movie with id = ${id} is not found.`);
    }

    return await this.repo.movie.delete({
      where: {id},
    });
  }
}
