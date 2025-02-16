import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopUserRepository } from './shop-user.repository';

@Injectable()
export class ShopUserService {
  constructor(private readonly shopUserRepository: ShopUserRepository) {}

  public async getUserInfo(userId: string) {
    const existUser = await this.shopUserRepository.findById(userId);
    if (!existUser) {
      throw new NotFoundException('User not found');
    }
    return existUser;
  }
}
