import { Genre } from './genre.dto';
import { Prisma } from '@prisma/client';

export class Movie{
    title: string;
    dailyRentalRate: Prisma.Decimal;
    genre: Genre
}