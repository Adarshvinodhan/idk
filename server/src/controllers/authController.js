import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      lastLoggedIn: new Date()
    });
    res.status(200).json("User Registration Successful");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: "Error during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const passMatch = await bcrypt.compare(password, user.password) //compare pass
    if (!passMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign({ id: user.id, username: user.name, email: user.email,role:user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    await user.update({ refreshToken, lastLoggedIn: new Date() });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Only over HTTPS
      sameSite: 'Strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({ accessToken });

  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send('Refresh token required');

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user
    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).send('Invalid refresh token');
    }

    // Issue new access token
    const accessToken = jwt.sign(
      { id: user.id, username: user.name, email: user.email,role:user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });

  } catch (err) {
    res.status(403).send('Invalid refresh token');
  }
};


export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).send('Refresh token required');

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.userId);

    if (user) {
      // Remove refresh token from DB
      user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
      await user.save();
    }

    res.sendStatus(204);
  } catch {
    res.sendStatus(204);
  }
};
