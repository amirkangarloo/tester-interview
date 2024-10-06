import {
  Injectable,
  NotFoundException,
  OnModuleInit,
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
export class DbService implements OnModuleInit {
  private $User: Map<string, User> = new Map();
  private $Product: Map<string, Product> = new Map();

  onModuleInit() {
    this.setProducts();
  }

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

  getProducts(): Product[] {
    const list: Product[] = [];
    this.$Product.forEach((product) => {
      list.push(product);
    });
    return list;
  }

  private setProducts() {
    const products: Product[] = [
      { id: uuidv4(), name: 'iphone', price: 100 },
      { id: uuidv4(), name: 'mac', price: 200 },
      { id: uuidv4(), name: 'air pod', price: 50 },
    ];
    for (const product of products) {
      this.$Product.set(product.id, product);
    }
  }
}
