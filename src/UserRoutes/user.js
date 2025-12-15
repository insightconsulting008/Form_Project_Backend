const express = require('express');
const router = express.Router();
const prisma = require('../Prisma/prisma');

/**
 * CREATE - Register User
 * POST /register
 */
router.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * READ - Get All Users
 * GET /users
 */
router.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * READ - Get User By ID
 * GET /users/:id
 */
router.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        userId: userId 
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE - Update User
 * PUT /users/:id
 */
router.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const user = await prisma.user.update({
      where: {
        userId: userId
      },
      data: {
        name,
        email,
        password
      }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE - Delete User
 * DELETE /users/:id
 */
router.delete('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.user.delete({
      where: {
        userId: userId
      }
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
