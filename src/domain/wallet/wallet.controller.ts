import { Body, Controller, Headers, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DbService } from 'src/db/db.service';
import { ChargeWalletDto } from 'src/domain/wallet/dto';

@Controller({ path: 'wallet' })
export class WalletController {
  constructor(
    private readonly db: DbService,
    private readonly walletService: WalletService,
  ) {}

  @Post('/charge')
  charge(
    @Body() body: ChargeWalletDto,
    @Headers('authorization') authorization: string,
  ) {
    this.db.validateUserToken(authorization);
    return this.walletService.charge(body);
  }
}
