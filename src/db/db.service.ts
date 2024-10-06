import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto, RegisterDto } from 'src/domain/user/dto';
import { ChargeWalletDto } from 'src/domain/wallet/dto';
import { CreateOrderDto } from 'src/domain/order/dto';

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
  userId: string;
  products: Product[];
  totalAmount: number;
  isPaid: boolean;
};

@Injectable()
export class DbService implements OnModuleInit {
  private $User: Map<string, User> = new Map();
  private $Product: Map<string, Product> = new Map();
  private $Order: Map<string, Order> = new Map();

  onModuleInit() {
    this.setProducts();
  }

  /// User
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

  /// User - Token
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
    const [, userId] = token.split('TOKEN:');
    const user = this.$User.get(userId);
    if (!user) {
      throw new UnauthorizedException('token not valid');
    }
    return user;
  }

  /// Wallet
  changeUserWallet(data: ChargeWalletDto): User {
    const user = this.getUserById(data.userId);
    user.walletBalance = data.amount;
    return user;
  }

  /// Product
  getProducts(): Product[] {
    const list: Product[] = [];
    this.$Product.forEach((product) => {
      list.push(product);
    });
    return list;
  }

  private getProductById(id: string): Product {
    const product = this.$Product.get(id);
    return product;
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

  /// Order
  getOrders(): Order[] {
    const list: Order[] = [];
    this.$Order.forEach((order) => {
      list.push(order);
    });
    return list;
  }

  getOrderById(orderId: string): Order {
    const order = this.$Order.get(orderId);
    if (!order) {
      throw new NotFoundException('order not found');
    }
    return order;
  }

  createOrder(userId: string, data: CreateOrderDto): Order {
    const { productList } = data;
    let totalAmount = 0;
    const user = this.getUserById(userId);
    const products: Product[] = [];
    productList.forEach(({ id, count }) => {
      const product = this.getProductById(id);
      if (product) {
        products.push(product);
        totalAmount += product.price * count;
      }
    });
    const msg: Order = {
      id: uuidv4(),
      isPaid: false,
      products,
      totalAmount,
      userId,
    };
    this.$Order.set(msg.id, msg);
    return msg;
  }

  paidOrder(orderId: string): Order {
    const order = this.getOrderById(orderId);
    if (!order.isPaid) order.isPaid = true;
    return order;
  }

  deleteOrder(orderId: string): string {
    const order = this.getOrderById(orderId);
    if (!order.isPaid) {
      this.$Order.delete(orderId);
    }
    return 'delete success';
  }
}
