import { Body, Controller, Headers, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DbService } from 'src/db/db.service';
import { ChargeWalletDto } from 'src/domain/wallet/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'wallet' })
@ApiTags('Wallet')
export class WalletController {
  constructor(
    private readonly db: DbService,
    private readonly walletService: WalletService,
  ) {}

  @Post('/charge')
  @ApiOperation({ summary: 'شارژ کیف پول کاربر' })
  charge(@Body() body: ChargeWalletDto, @Headers('token') token: string) {
    return this.walletService.charge(body);
  }
}
