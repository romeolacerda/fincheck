import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { AuthenticateDto } from './dtos/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService){}

  async authenticate(authenticateDto: AuthenticateDto){
    const {email, password} = authenticateDto
    
    const user = await this.usersRepo.findUnique({
      where: {email : email}
    })

    if(!user){
      throw new UnauthorizedException('Invalid credentials.')
    }

    const isValidPassword = await compare(password, user.password)

    if(!isValidPassword){
      throw new UnauthorizedException('Invalid credentials.')
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id})
    
    return { accessToken }
  }
}
