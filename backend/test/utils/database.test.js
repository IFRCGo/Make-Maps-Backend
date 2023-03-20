import mongoose from 'mongoose';
import { connectDB } from "../../utils/database.js";
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";

describe('connectDB function', () => {
  beforeAll(() => {
    // Suppress Mongoose error logging
    mongoose.connection.on('error', () => {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database', async () => {
    const result = await connectDB();
    expect(mongoose.connection.readyState).toBe(1);
    expect(result).toBeUndefined();
  });

  it('should throw an error if unable to connect to the database', async () => {
    const originalEnv = process.env;
    process.env.MONGO_URL = 'invalid-url';
    process.env.NODE_ENV = 'test';

    await expect(connectDB()).rejects.toThrowError(
        'Unable to connect to database:'
    );

    process.env = originalEnv;
  });
});
