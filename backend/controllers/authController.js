import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, passwordHash: hashedPassword, isOnline: true });

    res.status(201).json({
      token: jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      }),
      data: newUser,
      message: 'User created successfully',
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      data: user,
      message: 'Login successful',
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
