import { Connection } from 'mongoose';
import { DB_CONNECTION, TASK_MODEL } from 'src/utils/constants';
import { taskSchema } from './Schema/tasks.schema';

// user modal creation

export const taskProviders = [
  {
    provide: TASK_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Tasks', taskSchema),
    inject: [DB_CONNECTION],
  },
];
