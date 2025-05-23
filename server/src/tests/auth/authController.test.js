import { registerUser } from '../../controllers/authController';
import bcrypt from 'bcrypt';
import { User } from '../../models/userModel';

//Mock Module and Models
jest.mock('bcrypt');                                         
jest.mock('../../models/userModel', () => ({                
  User: {
    create: jest.fn()
  }
}));

//Describing List of Tests
describe('registerUser', () => {
  let req, res;

  //Runs before Every It and expect
  beforeEach(() => {
    req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password@123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

 //Succesfull registration
  it('should register a new user successfully', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    User.create.mockResolvedValue({});

    await registerUser(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('Password@123', 10);
    expect(User.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      lastLoggedIn: expect.any(Date)
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("User Registration Successful");
  });

 //Email already exist
  it('should return 400 if email already exists', async () => {
    const error = new Error('Unique constraint error');
    error.name = 'SequelizeUniqueConstraintError';
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    User.create.mockRejectedValue(error);

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email already exists' });
  });

  //other error
  it('should return 500 for other errors', async () => {
    const error = new Error('Something went wrong');
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    User.create.mockRejectedValue(error);

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error during registration' });
  });
});
