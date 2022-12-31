import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "./dto";
import { where } from "sequelize";
import { AppError } from "../common/constants/error";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async hashPassword(password){
    return await bcrypt.hash(password, 10)
  }
  async findUserByEmail(email: string) {
     return await this.userRepository.findOne({where: {email}})
  }

 async createUser(dto: CreateUserDto): Promise<CreateUserDto> {


     dto.password = await this.hashPassword(dto.password)
     await this.userRepository.create({
       firstName: dto.firstName,
       userName: dto.userName,
       email: dto.email,
       password: dto.password
     })
     return dto


  }

}
