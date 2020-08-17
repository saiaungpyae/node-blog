
import mongoose from 'mongoose';

import userSeeder from './user';
import tagSeeder from './tag';
import postSeeder from './post';

const config = require('../config')
const db = config.db

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected to', db)
  })
  .catch(err => console.log(err))

const seeder = async () => {
  try {
    const users = await userSeeder();
    const tags = await tagSeeder();
    await postSeeder(users, tags);
  } catch (err) {
    console.log(err)
  }
  mongoose.disconnect()
}

seeder()
