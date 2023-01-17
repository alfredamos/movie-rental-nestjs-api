import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Customer } from '@prisma/client';
import { CustomerInfo } from '../models/customer-info.model';

@Injectable()
export class CustomerService {
  constructor(private repo: PrismaService) {}

  async findAll(): Promise<CustomerInfo[]> {
    return await this.repo.customer.findMany({    
      select: {
        id: true,
        name: true,
        userType: true,
        rentals: true,
      },
    });
  }

  async findOne(id: string): Promise<CustomerInfo> {
    const customer = await this.repo.customer.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        userType: true,
        rentals: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id = ${id} is not found.`);
    }

    return customer;
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
      }
    });
  }
}
