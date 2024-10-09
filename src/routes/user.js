const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, toggleBlockUser, getUser } = require('../api/user');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controller/user')

router.patch('/:id/bloquear', permissionMiddleware('admin'), toggleBlockUser);

router.post('/', createUser);

router.get('/:id', authMiddleware(), getUser);

router.put('/:id', authMiddleware(), async (req, res) => {
  const { id } = req.params; 
  const user = req.user; 

  if (user && (user.role === 'admin' || user.id == id)) {
    try {
      const updatedUser = await updateUser(req, res); 
      return res.status(200).json(updatedUser); 
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
  } else {
    console.log('Enviando resposta:', { message: 'Acesso negado. Você só pode alterar sua própria conta.' });
  }
});

router.delete('/:id', authMiddleware(), async (req, res) => {
  const { id } = req.params; 
  const user = req.user;
  if (user && (user.role === 'admin' || user.id == id)) {
    try {
      await deleteUser(req, res);
      return res.status(200).json({ message: 'Usuário deletado com sucesso.' }); 
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
    }
  } else {
    console.log('Enviando resposta:', { message: 'Acesso negado. Você só pode alterar sua própria conta.' });
  }
});


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
 