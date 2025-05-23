import { getAllUsers } from '../../controllers/userController.js';
import { User } from '../../models/userModel.js';
import { UserDetails } from '../../models/userModel.js';

jest.mock('../../models/userModel.js', () => ({
  User: {
    findAll: jest.fn(),
  },
  UserDetails: {}
}));

describe('getAllUsers', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return users with status 200', async () => {
        //mock data to return
    const mockUsers = [
      { id: 1, name: 'Alice', details: { img: 'alice.jpg' } },
      { id: 2, name: 'Bob', details: { img: 'bob.jpg' } },
    ];
    User.findAll.mockResolvedValue(mockUsers);

    // Act
    await getAllUsers(req, res);

    // Assert
    expect(User.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: UserDetails,
          as: 'details',
          attributes: ['img'],
        }
      ]
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should return status 500 on error', async () => {
    // Arrange: make findAll throw
    jest.spyOn(console, 'error').mockImplementation(() => {});

    User.findAll.mockRejectedValue(new Error('DB error'));

    // Act
    await getAllUsers(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Server error' });
    
  });
});
