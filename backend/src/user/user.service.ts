import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from 'src/utils/constants';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interfaces/user.interfaces';

@Injectable()
export class UserServices {
  constructor(@Inject(USER_MODEL) private userModal: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    console.log('coming into user', createUserDto);

    if (this.checkDatabaseConnection()) {
      console.log('DB is connected Sucessfully');
    }
  }

  async checkDatabaseConnection(): Promise<boolean> {
    const isConnected = this.userModal.db.readyState === 1; // 1 means connected

    return isConnected;
  }
}
