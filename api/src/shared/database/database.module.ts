import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoiresRepository } from './repositories/categories.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoiresRepository, BankAccountsRepository],
  exports: [UsersRepository, CategoiresRepository, BankAccountsRepository]
})
export class DatabaseModule {}
