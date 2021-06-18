import http from 'http';
import express from 'express';
import cors from 'cors';
import router from './router';

const bootServer = (port: number): http.Server => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(router);

  app.get('*', (_, res) => {
    res.status(404).send('Page not found');
  });
  app.post('*', (_, res) => {
    res.status(404).send('Page not found');
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on port:${port}`);
  });

  return server;
};

export default bootServer;
