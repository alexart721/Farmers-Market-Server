import express from 'express';
import cors from 'cors';
import bootDB from './db';
import router from './router';

const PORT = process.env.PORT || 3001;

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

(async () => {
  await bootDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
  });
})();
