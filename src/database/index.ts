import { Database } from  '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { User } from './model/User';
import { Car } from './model/Car';
import { schemas } from './schema';

const adapter = new SQLiteAdapter({
  schema: schemas
});

export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Car
  ],
  actionsEnabled: true
})