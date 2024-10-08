const express = require('express');


const router = express.Router();
const { createUser, updateUser, deleteUser, toggleBlockUser, getUser } = require('../api/user');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


router.patch('/:id/bloquear', permissionMiddleware('admin'), toggleBlockUser);

router.post('/', createUser);

router.get('/:id', authMiddleware(), getUser);

router.put('/:id', authMiddleware(), async (req, res, next) => {
  const { id } = req.user; 
  if (req.user.role === 'admin' || req.user.id == req.params.id) {
    return updateUser(req, res, next); 
  } else {
    return res.status(403).json({ message: 'Acesso negado. Você só pode alterar sua própria conta.' });
  }
});

router.delete('/:id', authMiddleware(), async (req, res, next) => {
  const { id } = req.user;
  if (req.user.role === 'admin' || req.user.id == req.params.id) {
    return deleteUser(req, res, next);
  } else {
    return res.status(403).json({ message: 'Acesso negado. Você só pode deletar sua própria conta.' });
  }
});

router.patch('/:id/bloquear', permissionMiddleware('admin'), toggleBlockUser);

module.exports = router;
