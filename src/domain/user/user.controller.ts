import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/domain/user/dto';

@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {}

  @Post('/login')
  login() {}

  @Get()
  getUser() {}

  @Patch()
  update() {}
}
