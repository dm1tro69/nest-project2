import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto";
import { AppError } from "../common/constants/error";
import { UserLoginDto } from "./dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  async registerUser(dto: CreateUserDto): Promise<CreateUserDto>{
       const existUser = await this.userService.findUserByEmail(dto.email)
    if (existUser){
      throw new BadRequestException(AppError.USER_EXIST)
    }
    return this.userService.createUser(dto)
  }

  async loginUser(dto: UserLoginDto) {
     const existUser = await this.userService.findUserByEmail(dto.email)
    if (!existUser){
      throw new BadRequestException(AppError.WRONG_DATA)
    }
    const validatePassword = bcrypt.compare(dto.password, existUser.password)
    if (!validatePassword){
      throw new BadRequestException(AppError.WRONG_DATA)
    }
    return existUser

  }

}
