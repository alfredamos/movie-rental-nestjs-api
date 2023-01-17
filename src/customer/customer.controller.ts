import { Controller, Get, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {Roles} from 'src/decorators/roles.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles('Admin')
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Roles('Admin', 'Customer')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
