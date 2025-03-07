import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {

    const {name, email, password} = createUserDto

    
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return user
  }
}
