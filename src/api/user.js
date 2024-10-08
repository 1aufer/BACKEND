// src/api/user.js
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { nome, email, senha, role } = req.body; 

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hash = bcrypt.hashSync(senha, 10);

    const newUser = await User.create({
      nome,
      email,
      senha: hash,
      role: role || 'viewer', 
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error); 
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const hash = senha ? bcrypt.hashSync(senha, 10) : undefined;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    user.nome = nome || user.nome;
    user.email = email || user.email;
    if (hash) user.senha = hash;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    await user.destroy();
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
};

const toggleBlockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    user.bloqueado = !user.bloqueado;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao bloquear usuário', error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};

module.exports = { createUser, updateUser, deleteUser, toggleBlockUser, getUser };
