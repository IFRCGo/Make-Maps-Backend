import mongoose from 'mongoose';
import { User } from '../../modules/User/models/UserMongoose';

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('User creation', () => {
    it('should create and save a new user', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'FirstName1',
        lastName: 'LastName1',
        role: 'User',
      };
      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe('testuser@example.com');
      expect(savedUser.firstName).toBe('FirstName1');
      expect(savedUser.lastName).toBe('LastName1');
      expect(savedUser.role).toBe('User');
    });
    
  });
});
