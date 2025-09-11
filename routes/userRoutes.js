import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    // Handling specific error for duplicate email
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    } else {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
});

export default router;
