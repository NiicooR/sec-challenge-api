import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class EtherscanService {
  private axios_instance: AxiosInstance;

  constructor() {
    this.axios_instance = axios.create({
      baseURL: process.env.ETHERSCAN_URL,
    });
  }

  async getWalletInfo(address: string): Promise<{ isOld: boolean; balanceInWei: string }> {
    return { ...(await this.getWalletLastTransactionInfo(address)), ...(await this.getWalletBalance(address)) };
  }

  private async getWalletLastTransactionInfo(address: string) {
    const result = await this.axios_instance.get<{
      result: { timeStamp: number }[];
    }>('/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        sort: 'asc',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    const firstTxTimeInMillis = result.data.result[0].timeStamp * 1000;
    const AYearAgoTimeInMillis = new Date().getTime() - 365 * 24 * 60 * 60 * 1000;

    return {
      isOld: AYearAgoTimeInMillis > firstTxTimeInMillis,
    };
  }

  private async getWalletBalance(address: string): Promise<{ balanceInWei: string }> {
    const result = await this.axios_instance.get<{
      result: string;
    }>('/api', {
      params: {
        module: 'account',
        action: 'balance',
        address,
        apikey: process.env.ETHERSCAN_API_KEY,
        tag: 'latest',
      },
    });
    return { balanceInWei: result.data.result };
  }
}
