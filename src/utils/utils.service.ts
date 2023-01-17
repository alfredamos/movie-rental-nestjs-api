import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentalUtils } from './dto/rentals-utils.dto';


@Injectable()
export class UtilsService {
  constructor(private prisma: PrismaService) {}

  async findAllCustomerRentals(customerId: string): Promise<RentalUtils[]> {
    return await this.prisma.rental.findMany({
      where: { customerId },
      select: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
            gender: true,
            isGold: true,
          },
        },
        movie: {
          select: {
            title: true,
            dailyRentalRate: true,
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        rentalFee: true,
        dateOut: true,
        dateReturn: true,
      },
    });
  }

  async findAllMovieRentals(movieId: string): Promise<RentalUtils[]> {
    return await this.prisma.rental.findMany({
      where: { movieId },
      select: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true,
            gender: true,
            isGold: true,
          },
        },
        movie: {
          select: {
            title: true,
            dailyRentalRate: true,
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        rentalFee: true,
        dateOut: true,
        dateReturn: true,
      },
    });
  }
}
