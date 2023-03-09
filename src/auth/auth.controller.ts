import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeProfileDto } from './dto/change-profile.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { IsPublic } from 'src/decorators/is-public.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Patch('edit-profile')
  editProfile(@Body() changeProfileDto: ChangeProfileDto) {
    return this.authService.editProfile(changeProfileDto);
  }

  
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

}
function CurrentCustomer(): (target: AuthController, propertyKey: "getCurrentUser", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

