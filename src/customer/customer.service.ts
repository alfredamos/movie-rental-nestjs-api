import { CurrentUser } from './../decorators/current-user.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerInfo } from '../models/customer-info.model';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { CustomerAdminDto } from './dto/customer-admin.dto';

@Injectable()
export class CustomerService {
  constructor(private repo: PrismaService) {}

  async findAll(): Promise<CustomerInfo[]> {
    return await this.repo.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        isGold: true,
        userType: true,
        rentals: true,
      },
    });
  }

  async findOne(id: string): Promise<CurrentUserDto> {
    const customer = await this.repo.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        isGold: true,
        userType: true,
        rentals: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id = ${id} is not found.`);
    }

    return customer;
  }

  async getAllForAdminUse() {
   return await this.repo.customer.findMany({});
  }

  async getCurrentUser(user: CurrentUserDto): Promise<CurrentUserDto> {
    const id = user.id;
    return this.findOne(id);
  }

  async update(id: string, customerAdminDto: CustomerAdminDto) {
    
    const customer = await this.repo.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id = ${id} is not found.`);
    }

    return await this.repo.customer.update({
      where: { id },
      data: {...customerAdminDto},
    });
  }

  async remove(id: string): Promise<CustomerInfo> {
    const customer = await this.repo.customer.findUnique({
      where: { id },
    
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id = ${id} is not found.`);
    }

    return await this.repo.customer.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        userType: true,
        rentals: true,
      },
    });
  }
}
