import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { OrderModule } from 'src/domain/order/order.module';
import { ProductModule } from 'src/domain/product/product.module';
import { UserModule } from 'src/domain/user/user.module';
import { WalletModule } from 'src/domain/wallet/wallet.module';

@Module({
  imports: [DbModule, UserModule, OrderModule, ProductModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
