import { CanModifyGuard } from "./../guards/can-modify.guard";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('rentals')
export class RentalController {
  constructor(
    private readonly rentalService: RentalService
  ) {}

  @Roles('Admin', 'Customer')
  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalService.create(createRentalDto);
  }

  @Roles('Admin', 'Customer')
  @Get()
  findAll() {
    return this.rentalService.findAll();
  }

  @Roles('Admin', 'Customer')
  @UseGuards(CanModifyGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalService.findOne(id);
  }

  @Roles('Admin', 'Customer')
  @UseGuards(CanModifyGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalDto: UpdateRentalDto) {
    console.log("I'm in update");

    return this.rentalService.update(id, updateRentalDto);
  }

  @Roles('Admin', 'Customer')
  @UseGuards(CanModifyGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalService.remove(id);
  }
}
