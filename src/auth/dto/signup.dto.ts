import { Gender, UserType } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender
  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;
}