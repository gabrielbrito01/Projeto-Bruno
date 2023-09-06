const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;


exports.authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await User.findOne({ username, password, role: 'employee' });

    if (employee) {

      const token = jwt.sign({ userId: employee._id, role: 'employee' }, 'your-secret-key', {
        expiresIn: '1h', 
      });
      return res.json({ token });
    }

    const client = await User.findOne({ username, password, role: 'client' });

    if (client) {
      const token = jwt.sign({ userId: client._id, role: 'client' }, '1234', {
        expiresIn: '1h',
      });
      return res.json({ token });
    }

    res.status(401).json({ error: 'Falha na autenticação' });
  } catch (err) {
    res.status(500).json({ error: 'Erro na autenticação' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: username, password, role' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: 'Nome de usuário já está em uso' });
    }

    const newUser = new User({
      username,
      password,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar os usuários' });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao recuperar o usuário' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const { username, password, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { username, password, role }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
};



  
  


