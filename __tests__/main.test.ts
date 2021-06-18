import { Mongoose } from 'mongoose';
import request, { Test } from 'supertest';
import { Server } from 'http';
import bootServer from '../server';
import bootDB from '../db';

const port = Number(process.env.TEST_PORT);
const connectionString = String(process.env.TEST_DB_BASE_URL);

let server: Server;
let db: Mongoose | undefined;

beforeAll(async () => {
  db = await bootDB(connectionString);
  await db?.connection.db.dropDatabase();
  server = bootServer(port);
});

describe('POST /register', () => {
  let endpoint: Test;
  beforeEach(() => {
    endpoint = request(server).post('/register');
  });
  // TODO
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('test the test', async () => {
    const response = await endpoint.send({});
    expect(response.status).toBe(400);
  });

  test('returns token', async () => {
    const response = await endpoint.send({
      firstName: 'Bob', lastName: 'Lovalova', email: 'bob@example.com', password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
  });
});

afterAll(async () => {
  await db?.connection.close();
  await server.close();
});
