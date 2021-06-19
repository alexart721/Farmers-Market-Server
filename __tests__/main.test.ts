import { Mongoose } from 'mongoose';
import request, { Test } from 'supertest';
import { Server } from 'http';
import bootServer from '../server';
import bootDB from '../db';
import { seedDb, random } from '../__seed__';
import { UserEntry } from '../models/user';
import { ProductEntry } from '../models/product';

const port = Number(process.env.TEST_PORT);
const connectionString = String(process.env.TEST_DB_BASE_URL);

let server: Server;
let db: Mongoose | undefined;
let mockUsers: UserEntry[];
let mockProducts: ProductEntry[];

beforeAll(async () => {
  db = await bootDB(connectionString);
  if (db) {
    await db?.connection.db.dropDatabase();
    const seedData = await seedDb(db);
    mockUsers = seedData.users;
    mockProducts = seedData.products;
  }
  server = bootServer(port);
});

test('Mock users and mock products must be present', () => {
  expect(mockUsers).toHaveLength(50);
  expect(mockProducts).toHaveLength(200);
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
      firstName: 'Bob',
      lastName: 'Lovalova',
      email: 'bob@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
  });

  test('returns 409 if user exists', async () => {
    const response = await endpoint.send(mockUsers[random(mockUsers.length)]);
    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });
});

afterAll(async () => {
  await db?.connection.close();
  await server.close();
});
