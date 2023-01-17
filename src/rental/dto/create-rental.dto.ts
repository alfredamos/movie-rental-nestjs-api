import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRentalDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;
    @IsString()
    @IsNotEmpty()
    movieId: string;
    @IsOptional()
    dateReturn?: Date;
    @IsNumber()
    @IsNotEmpty()
    rentalFee: number;
}
