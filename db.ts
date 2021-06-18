import { connect } from 'mongoose';

const { DB_BASE_URL = '' } = process.env;

const bootDB = async (): Promise<void> => {
  try {
    await connect(DB_BASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Successfully connected to the database.');
  } catch (err) {
    console.log('[Database connection error]:\n', err);
  }
};

export default bootDB;
