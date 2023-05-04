import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { ConfigModule } from '@nestjs/config';
import { WalletDetailModule } from './wallet-detail/wallet-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WalletModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: Boolean(process.env.POSTGRES_AUTO_LOAD),
      logging: process.env.POSTGRES_LOGGING === 'true' || false,
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' || false,
      dropSchema: process.env.POSTGRES_DROP_SCHEMA === 'true' || false,
    }),
    ExchangeRateModule,
    WalletDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
