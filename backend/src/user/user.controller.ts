import { Body, Controller, Post } from '@nestjs/common';
import { BASE_URL } from 'src/utils/constants';
import { UserServices } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller(`${BASE_URL}/user`)
export class UserController {
  constructor(private userServices: UserServices) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userServices.createUser(createUserDto);
  }
}
