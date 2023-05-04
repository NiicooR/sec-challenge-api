import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    if (await this.findOne(createWalletDto.address)) throw Error('Address already exits');
    return this.walletRepository.save(createWalletDto);
  }

  async findAll() {
    return this.walletRepository.find();
  }

  async findOne(address: string) {
    return this.walletRepository.findOne({ where: { address } });
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const foundWallet = await this.walletRepository.findOne({ where: { id } });
    return this.walletRepository.save({ ...foundWallet, ...updateWalletDto });
  }

  async remove(id: number) {
    return this.walletRepository.delete(id);
  }
}
