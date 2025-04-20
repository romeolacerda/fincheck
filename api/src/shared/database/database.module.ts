import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoiresRepository } from './repositories/categories.repositories';
import { UsersRepository } from './repositories/users.repositories';
import { TransactionsRepository } from './repositories/transactions.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoiresRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    CategoiresRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
