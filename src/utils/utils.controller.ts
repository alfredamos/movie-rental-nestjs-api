import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Roles('Admin', 'Customer')
  @Get('customer-rentals/:customerId')
  findAllCustomerRentals(@Param('customerId') customerId) {
    return this.utilsService.findAllCustomerRentals(customerId);
  }

  @Roles('Admin', 'Customer')
  @Get('movie-rentals/:movieId')
  findAllMovieRentals(@Param('movieId') movieId) {
    return this.utilsService.findAllMovieRentals(movieId);
  }
}
