import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import {PrismaModule} from '../prisma/prisma.module'
import { CanModifyGuard } from '../guards/can-modify.guard';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService]
})
export class RentalModule {}
