import { Injectable } from '@nestjs/common';
import { DbService, User } from 'src/db/db.service';
import { LoginDto, RegisterDto } from 'src/domain/user/dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  register(body: RegisterDto) {
    const user = this.db.addUser(body);
    const res = this.generateResponse(user);
    return res;
  }

  login(body: LoginDto) {
    return this.db.getUserToken(body);
  }

  getUser(userId: string) {
    const user = this.db.getUserById(userId);
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
