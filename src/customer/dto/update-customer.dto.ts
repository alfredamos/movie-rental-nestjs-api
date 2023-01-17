import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsString()
    @IsNotEmpty()
    id: string;
}
