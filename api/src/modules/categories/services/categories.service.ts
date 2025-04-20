import { Injectable } from '@nestjs/common';
import { CategoiresRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoiresRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
