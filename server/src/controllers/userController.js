import { User } from "../models/userModel.js";
import { UserDetails } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
  include: [
    {
      model: UserDetails,
      as:'details',
      attributes: ['img'], 
    }
  ]
});
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};


