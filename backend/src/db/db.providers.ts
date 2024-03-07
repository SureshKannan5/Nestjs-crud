import * as mongoose from 'mongoose';
import { DB_CONNECTION } from 'src/utils/constants';

// DB connection provider

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI),
  },
];
