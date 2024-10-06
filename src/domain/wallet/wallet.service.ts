import { Injectable } from '@nestjs/common';
import { DbService, User } from 'src/db/db.service';
import { ChargeWalletDto } from 'src/domain/wallet/dto';

@Injectable()
export class WalletService {
  constructor(private db: DbService) {}

  charge(body: ChargeWalletDto) {
    const user = this.db.changeUserWallet(body);
    const res = this.generateResponse(user);
    return res;
  }

  private generateResponse(body: User) {
    return {
      id: body.id,
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      walletBalance: body.walletBalance,
    };
  }
}
