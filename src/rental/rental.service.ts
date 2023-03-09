import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Rental } from '@prisma/client';

@Injectable()
export class RentalService {
  constructor(private repo: PrismaService) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {

    delete createRentalDto.dateReturn;
    
    if (!createRentalDto) {
      throw new BadRequestException('Invalid request');
    }
    return await this.repo.rental.create({
      data: {...createRentalDto},
    });
  }

  async findAll(): Promise<Rental[]> {
    return await this.repo.rental.findMany({
      include: {
        customer: true,
        movie: true,
      },
    });
  }

  

  async findOne(id: string) {
    const rental = await this.repo.rental.findUnique({
      where: { id },
      include: {
        customer: true,
        movie: true,
      },
    });

    if (!rental) {
      throw new NotFoundException(`Rental with id = ${id} is not found.`);
    }

    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.repo.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException(`Rental with id = ${id} is not found.`);
    }

    return await this.repo.rental.update({
      where: { id },
      data: {...updateRentalDto},
    });
  }

  async remove(id: string): Promise<Rental> {
    const rental = await this.repo.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException(`Rental with id = ${id} is not found.`);
    }

    return await this.repo.rental.delete({
      where: { id },
    });
  }
}
