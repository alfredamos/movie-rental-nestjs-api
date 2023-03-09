import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {Roles} from 'src/decorators/roles.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CanModifyGuard } from '../guards/can-modify.guard';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles('Admin', 'Customer')
  @Get()
  findAll() {
    return this.customerService.findAll();
  }
  
  @Roles('Admin', 'Customer')
  @Get('current-user')
  getCurrentUser(@CurrentUser() user: CurrentUserDto) {
    return this.customerService.getCurrentUser(user);        
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


