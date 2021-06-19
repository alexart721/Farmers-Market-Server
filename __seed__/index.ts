import { Mongoose } from 'mongoose';
import faker from 'faker';
import bcrypt from 'bcrypt';
import { UserEntry } from '../models/user';
import { ProductEntry } from '../models/product';

export interface DbSeedData {
  users: UserEntry[],
  products: ProductEntry[],
}

export const random = (max: number): number => Math.floor(Math.random() * max);

export const seedDb = async (db: Mongoose): Promise<DbSeedData> => {
  const users: UserEntry[] = Array.from({ length: 50 }, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
  await db.connection.models.User.insertMany(users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  })));

  const products: ProductEntry[] = Array.from({ length: 200 }, () => {
    const { firstName, lastName, email } = users[random(users.length)];
    return {
      firstName,
      lastName,
      email,
      productName: faker.commerce.productName(),
      productDescription: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      quantity: random(100),
      imageUrl: faker.image.food(),
      city: faker.address.city(),
      province: faker.address.county(),
    };
  });
  await db.connection.models.Product.insertMany(products);

  return { users, products };
};
