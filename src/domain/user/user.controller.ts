import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from 'src/domain/user/dto';
import { DbService } from 'src/db/db.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller({ path: 'user' })
@ApiTags('User')
export class UserController {
  constructor(
    private readonly db: DbService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'ثبت نام کاربر' })
  register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('/login')
  @ApiOperation({ summary: 'لاگین و گرفتن توکن' })
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Get('/me')
  @ApiOperation({ summary: 'دریافت اطلاعات کاربر' })
  getUser(@Headers('token') token: string) {
    const { id } = this.db.validateUserToken(token);
    return this.userService.getUser(id);
  }
}
