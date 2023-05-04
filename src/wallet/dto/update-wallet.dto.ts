import { IsBoolean } from 'class-validator';

export class UpdateWalletDto {
  @IsBoolean()
  isFavorite: boolean;
}
