import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletDetailModule } from '../wallet-detail/wallet-detail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), WalletDetailModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
