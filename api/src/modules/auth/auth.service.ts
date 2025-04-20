import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SinginDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/singup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository,
  ) {}

  async singin(SinginDto: SinginDto) {
    const { email, password } = SinginDto;

    const user = await this.usersRepo.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async singUp(SignupDto: SignupDto) {
    const { name, email, password } = SignupDto;

    const emailTaken = await this.userRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('this email has already been taken');
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
              { name: 'Paycheck', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Other', icon: 'other', type: 'INCOME' },
              { name: 'Home', icon: 'home', type: 'EXPENSE' },
              { name: 'Food', icon: 'food', type: 'EXPENSE' },
              { name: 'Fun', icon: 'Fun', type: 'EXPENSE' },
              { name: 'Groceries', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Clothes', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Education', icon: 'education', type: 'EXPENSE' },
              { name: 'Transport', icon: 'transport', type: 'EXPENSE' },
              { name: 'Travel', icon: 'travel', type: 'EXPENSE' },
              { name: 'Other', icon: 'Other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
