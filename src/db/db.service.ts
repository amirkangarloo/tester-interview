import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RegisterDto, UpdateUserDto } from 'src/domain/user/dto';
import { ChargeWalletDto } from 'src/domain/wallet/dto';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  walletBalance: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
};

type Order = {
  id: string;
  user: User;
  products: Product[];
};

@Injectable()
export class DbService {
  private $User: Map<string, User> = new Map();

  addUser(data: RegisterDto) {
    const id = uuidv4();
    this.$User.set(id, {
      id,
      firstName: data.firstName,
      lastName: data?.lastName ?? '',
      phoneNumber: data.phoneNumber,
      password: data.password,
      walletBalance: 0,
    });
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
        token = `TOKEN:${user.password}`;
    });
    if (!token) {
      throw new UnauthorizedException('phoneNumber or password is wrong!');
    }
    return token;
  }

  updateUser(data: UpdateUserDto): User {
    const { userId, firstName, lastName } = data;
    const user = this.getUserById(userId);
    user.firstName = firstName ? firstName : user.firstName;
    user.lastName = lastName ? lastName : user.lastName;
    return user;
  }

  changeUserWallet(data: ChargeWalletDto): User {
    const user = this.getUserById(data.userId);
    user.walletBalance = data.amount;
    return user;
  }
}
