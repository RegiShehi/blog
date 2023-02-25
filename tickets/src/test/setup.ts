import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'aserdgerger';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

const signin = () => {
  // Build a JWT payload { id, email }
  const payload = { id: 'somerandomtext', email: 'test@test.com' };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // Encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return string thats a cookie with encoded data
  return [`session=${base64}`];
};

export { signin };
