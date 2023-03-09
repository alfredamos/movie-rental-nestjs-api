import { SetMetadata } from '@nestjs/common';
import { CustomerInfo } from '../models/customer-info.model';

export const User = (user:CustomerInfo) => SetMetadata('user', user);
