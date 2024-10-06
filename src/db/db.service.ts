import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RegisterDto } from 'src/domain/user/dto';
import { ChargeWalletDto } from 'src/domain/wallet/dto';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  walletBalance: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
};

export type Order = {
  id: string;
  user: User;
  products: Product[];
  totalAmount: number;
};

@Injectable()
export class DbService {
  private $User: Map<string, User> = new Map();

  addUser(data: RegisterDto) {
    const id = uuidv4();
    const body = {
      id,
      firstName: data.firstName,
      lastName: data?.lastName ?? '',
      phoneNumber: data.phoneNumber,
      password: data.password,
      walletBalance: 0,
    };
    this.$User.set(id, body);
    return body;
  }

  getUserById(id: string): User {
    const user = this.$User.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getUserToken(data: LoginDto): string {
    const { password, phoneNumber } = data;
    let token: string;
    this.$User.forEach((user) => {
      if (user.phoneNumber === phoneNumber && user.password === password)
        token = `TOKEN:${user.id}`;
    });
    if (!token) {
      throw new UnauthorizedException('phoneNumber or password is wrong!');
    }
    return token;
  }

  validateUserToken(token: string): User {
    const [, userId] = token.split('Bearer TOKEN:');
    const user = this.$User.get(userId);
    if (!user) {
      throw new UnauthorizedException('token not valid');
    }
    return user;
  }

  changeUserWallet(data: ChargeWalletDto): User {
    const user = this.getUserById(data.userId);
    user.walletBalance = data.amount;
    return user;
  }
}
