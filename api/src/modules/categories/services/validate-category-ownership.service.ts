import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CategoiresRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoiresRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoriesRepo.findFirst({
      where: { userId, id: categoryId },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
