import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class CryptoCompareDataSource {
  private axios_instance: AxiosInstance;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: 'https://min-api.cryptocompare.com/',
      headers: {
        authorization: `Apikey ${process.env.CRYPTOCOMPARE_API_KEY} `,
      },
    });
  }

  async getExchangeRate() {
    const method = '/data/price?fsym=ETH&tsyms=USD,EUR';
    const response = await this.axios_instance.get<{ USD: number; EUR: number }>(method);
    return response.data;
  }
}
