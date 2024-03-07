import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { UserServices } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserServices, ...userProviders],
})
export class UserModule {}
