import bootDB from './db';
import bootServer from './server';

const PORT = Number(process.env.PORT) || 3001;
const connectionString = String(process.env.DB_BASE_URL);

bootDB(connectionString);
bootServer(PORT);
