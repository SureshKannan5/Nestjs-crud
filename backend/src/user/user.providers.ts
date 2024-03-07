import { Connection } from 'mongoose';
import { DB_CONNECTION, USER_MODEL } from 'src/utils/constants';
import { userSchema } from './Schemas/user.schema';

// user modal creation

export const userProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('USER', userSchema),
    inject: [DB_CONNECTION],
  },
];
