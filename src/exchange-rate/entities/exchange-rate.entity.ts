import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  usdEthRate: string;
  @Column()
  eurEthRate: string;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
