import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { GenreModule } from './genre/genre.module';
import { MovieModule } from './movie/movie.module';
import { RentalModule } from './rental/rental.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { UtilsModule } from './utils/utils.module';
import { CanModifyGuard } from './guards/can-modify.guard';

@Module({
  imports: [
    CustomerModule,
    GenreModule,
    MovieModule,
    RentalModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CanModifyGuard
  ],
})
export class AppModule {}
