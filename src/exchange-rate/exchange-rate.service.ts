import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { Repository } from 'typeorm';
import { CryptoCompareDataSource } from './cryptocompare.datasource';

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepository: Repository<ExchangeRate>,
    @Inject(CryptoCompareDataSource)
    private cryptoCompareDataSource: CryptoCompareDataSource,
  ) {}

  async getExchangeRate() {
    const exchangeRates = await this.exchangeRateRepository.find();

    if (exchangeRates.length === 0) {
      const newExcRate = await this.createExchangeRate();
      console.log('No exchange rate found, creating...');
      return this.exchangeRateRepository.save(newExcRate);
    }

    if (exchangeRates.length > 1) throw Error('Unexpected amount of exchange rates');

    const excRate = exchangeRates[0];
    console.log('Date found, ', excRate.updatedAt);
    const excRateTtl = new Date(excRate.updatedAt);
    excRateTtl.setMinutes(excRateTtl.getMinutes() + 5);
    console.log('TTl ', excRateTtl);
    if (excRateTtl > new Date()) return excRate;
    console.log('Ttl expired...', excRateTtl > new Date(), new Date());

    const newExcRate = await this.createExchangeRate();
    console.log('Updating exchange rate...');
    return await this.exchangeRateRepository.update(excRate.id, newExcRate);
  }

  private async createExchangeRate() {
    const excRateData = await this.cryptoCompareDataSource.getExchangeRate();
    console.log(excRateData);
    const excRate = new ExchangeRate();
    excRate.eurEthRate = excRateData.EUR.toString();
    excRate.usdEthRate = excRateData.USD.toString();
    return excRate;
  }
}
