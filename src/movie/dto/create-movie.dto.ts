import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  genreId: string;
  @IsNumber()
  @IsNotEmpty()
  numberInStock: number;
  @IsNumber()
  @IsNotEmpty()
  dailyRentalRate: number;
}
