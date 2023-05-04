import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { EtherscanService } from '../wallet-detail/etherscan.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService, private readonly etherscanService: EtherscanService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get(':address')
  getWalletDetails(@Param('address') address: string) {
    return this.etherscanService.getWalletInfo(address);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.walletService.remove(id);
  }
}
