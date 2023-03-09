import { CurrentUser } from "./../decorators/current-user.decorator";
import { ForbiddenException, Injectable, BadRequestException } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeProfileDto } from './dto/change-profile.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomerInfo } from '../models/customer-info.model';
import { Observable } from 'rxjs';
import { CurrentUserDto } from "./dto/current-user.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<CustomerInfo> {
    const { email, oldPassword, newPassword, confirmPassword } =
      changePasswordDto;

    //----> Check that the new password matches confirm password.
    const isEqual = newPassword.normalize() === confirmPassword.normalize();

    if (!isEqual) {
      throw new BadRequestException(
        'New password does not match confirm password',
      );
    }

    //----> Check for existence of password.
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    //----> Check for the existence of customer.
    if (!customer) {
      throw new ForbiddenException('Invalid credentials');
    }

    //----> Compare the given old password against the one in the database.
    const passwordInDatabase = customer.password;
    const isValid = await bcrypt.compare(oldPassword, passwordInDatabase);

    if (!isValid) {
      throw new ForbiddenException('Invalid credentials.');
    }

    //----> Hash the new password.
    const hashPassword = await bcrypt.hash(newPassword, 12);

    //----> Store the new password in the database.
    const updatedCustomerCredentials = await this.prisma.customer.update({
      where: { email },
      data: { ...customer, password: hashPassword },
    });

    //----> Send the success message to customer.

    return {
      id: updatedCustomerCredentials.id,
      name: updatedCustomerCredentials.name,
      userType: updatedCustomerCredentials.userType,
      message: 'Password updated successfully',
      isLoggedIn: true,
    };
  }

  async editProfile(changeProfileDto: ChangeProfileDto): Promise<CustomerInfo> {
    const { email, password, confirmPassword } = changeProfileDto;

    //----> Ensure that the given password matches confirm password,
    const isEqual = password.normalize() === confirmPassword.normalize();

    if (!isEqual) {
      throw new BadRequestException('Password must match confirm password');
    }

    delete changeProfileDto.confirmPassword;

    //----> Check for the existence of email.
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      throw new ForbiddenException('Invalid credentials.');
    }

    //----> Check the validity of the password.
    const passwordInData = customer.password;

    const isValid = await bcrypt.compare(password, passwordInData);

    if (!isValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    changeProfileDto.password = passwordInData;

    //----> Store the edited profile in database.
    const updatedCustomerProfile = await this.prisma.customer.update({
      where: { email },
      data: { ...changeProfileDto, id: customer.id },
    });

    //----> Send the updated success message to customer.
    return {
      id: updatedCustomerProfile.id,
      name: updatedCustomerProfile.name,
      userType: updatedCustomerProfile.userType,
      message: 'Profile updated successfully',
      isLoggedIn: true
    };
  }

  async login(loginDto: LoginDto): Promise<CustomerInfo> {
    const { email, password } = loginDto;

    //----> Check for existence of email.
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    //----> Check for existence of customer.
    if (!customer) {
      throw new ForbiddenException('Invalid credentials');
    }

    //----> Check the validity of password.
    const hashedPassword = customer.password; //----> Hashed Password from database.
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    //----> Customer payload as input for jwt.
    const customerPayload: CustomerInfo = {
      id: customer.id,
      name: customer.name,
      userType: customer.userType,
      isLoggedIn: true
    };

    //----> Get jwt token
    const token = await this.jwt.sign(customerPayload);

    //----> Send access token to the customer.
    return {
      ...customerPayload,
      message: 'Login is successful',
      token,
    };
  }

  async signup(signupDto: SignupDto): Promise<CustomerInfo> {
    const { email, password, confirmPassword } = signupDto;

    //----> Confirm that password matches confirm password.
    const isEqual = password.normalize() === confirmPassword.normalize();
    if (!isEqual) {
      throw new BadRequestException(
        'Password does not match confirm password.',
      );
    }

    delete signupDto.confirmPassword;

    //----> Check for the existence of email.
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (customer) {
      throw new BadRequestException('Email already exists');
    }    

    //----> Hash the password.
    const hashPassword = await bcrypt.hash(password, 12);

    //----> Store the customer credentials in database.
    const newCustomer = await this.prisma.customer.create({
      data: { ...signupDto, password: hashPassword },
    });

    //----> Send success message to customer.
    return {
      id: newCustomer.id,
      name: newCustomer.name,
      userType: newCustomer.userType,
      message: 'Signup is successful.',
      isLoggedIn: true
    };
  }
}
