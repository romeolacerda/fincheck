import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  
  async create(createUserDto: CreateUserDto) {

    const {name, email, password} = createUserDto

    const emailTaken = await this.userRepository.findUnique({
      where: { email },
      select: { id: true}
    })

    if(emailTaken) {
      throw new ConflictException('this email has already been taken')
    }

    const hashedPassword = await hash(password, 12);
    
    const user = await this.userRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Paycheck', icon: 'travel', type: 'INCOME'},
              { name: 'Freelance', icon: 'freelance', type: 'INCOME'},
              { name: 'Other', icon: 'other', type: 'INCOME'},
              { name: 'Home', icon: 'home', type: 'EXPENSE'},
              { name: 'Food', icon: 'food', type: 'EXPENSE'},
              { name: 'Fun', icon: 'Fun', type: 'EXPENSE'},
              { name: 'Groceries', icon: 'grocery', type: 'EXPENSE'},
              { name: 'Clothes', icon: 'clothes', type: 'EXPENSE'},
              { name: 'Education', icon: 'education', type: 'EXPENSE'},
              { name: 'Transport', icon: 'transport', type: 'EXPENSE'},
              { name: 'Travel', icon: 'travel', type: 'EXPENSE'},
              { name: 'Other', icon: 'Other', type: 'EXPENSE'},
            ]
          }
        }
      }
    })

    return {
      name: user.name,
      email: user.email
    }
  }
}
