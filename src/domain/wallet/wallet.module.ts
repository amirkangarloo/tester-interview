import { Module } from '@nestjs/common';
import { WalletController } from 'src/domain/wallet/wallet.controller';
import { WalletService } from 'src/domain/wallet/wallet.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
