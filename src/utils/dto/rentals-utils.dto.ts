import { Customer } from './customer.dto';
import { Movie } from './movie.dto';
import { Prisma } from '@prisma/client';

export class RentalUtils {
  customer: Customer;
  movie: Movie;
  rentalFee: Prisma.Decimal;
  dateOut: Date;
  dateReturn: Date;
}
