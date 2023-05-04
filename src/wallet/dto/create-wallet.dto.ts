import { IsBoolean, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  address: string;
  @IsBoolean()
  isFavorite: boolean;
}
