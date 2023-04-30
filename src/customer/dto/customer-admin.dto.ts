import { Gender, UserType } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CustomerAdminDto {
  @IsOptional()
  name: string;
  @IsOptional()
  email: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  password: string;  
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @IsOptional()
  @IsEnum(UserType)
  userType: UserType;
  @IsOptional()
  isGold: boolean;
}
