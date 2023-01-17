import {IsString, IsNotEmpty, IsOptional} from "class-validator";

export class CreateCustomerDto {    
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    phone: string;
    @IsOptional()
    isGold?: boolean
}
