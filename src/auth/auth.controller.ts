import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto";
import { UserLoginDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post('register')
  register(@Body()dto: CreateUserDto): Promise<CreateUserDto>{
     return this.authService.registerUser(dto)
  }

  @Post('login')
  login(@Body()dto: UserLoginDto): Promise<UserLoginDto> {
      return this.authService.loginUser(dto)
  }

}
