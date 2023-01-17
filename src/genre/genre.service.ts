import { Injectable,BadRequestException, NotFoundException, } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Genre } from '@prisma/client';
import { UuidTool } from 'uuid-tool';

@Injectable()
export class GenreService {
  constructor(private repo: PrismaService){}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    if (!createGenreDto){
      throw new BadRequestException('Invalid input');
    }
    return await this.repo.genre.create({
      data: createGenreDto,
    });
  }

  async findAll(): Promise<Genre[]> {
    return await this.repo.genre.findMany({
      include:{
        movies: true,
      }
    });
  }

  async findOne(id: string): Promise<Genre> {
    const genre = await this.repo.genre.findUnique({
      where: {id},
      include:{
        movies: true,
      }
    })

    if (!genre) {
      throw new NotFoundException(`Genre with id = ${id} is not found.`);
    }
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.repo.genre.findUnique({
      where: {id},
    })

    const {id: idFromBody} = updateGenreDto;

    const isEqual = UuidTool.compare(id, idFromBody);

    if (!isEqual){
      throw new BadRequestException('Id mismatch');
    }

    if (!genre) {
      throw new NotFoundException(`Genre with id = ${id} is not found.`);
    }

    return await this.repo.genre.update({
      where: {id},
      data: updateGenreDto,
    });
  }

  async remove(id: string) {
    const genre = await this.repo.genre.findUnique({
      where: {id},
    })

    if (!genre) {
      throw new NotFoundException(`Genre with id = ${id} is not found.`);
    }

    return await this.repo.genre.delete({
      where: {id},
    });
  }
}
