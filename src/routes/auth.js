const express = require('express');
const UserController = require('../api/user');
const router = express.Router();

// Rota para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const token = await UserController.login(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
