import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from 'src/domain/user/dto';
import { DbService } from 'src/db/db.service';

@Controller({ path: 'user' })
export class UserController {
  constructor(
    private readonly db: DbService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Get()
  getUser(@Headers('authorization') authorization: string) {
    const { id } = this.db.validateUserToken(authorization);
    return this.userService.getUser(id);
  }
}
