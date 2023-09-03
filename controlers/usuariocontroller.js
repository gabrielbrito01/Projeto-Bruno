const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar os usuários' });
    }
  }

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
  }

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
  }

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
  }

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

        const token = jwt.sign({ userId: client._id, role: 'client' }, 'your-secret-key', {
          expiresIn: '1h', 
        });
        return res.json({ token });
      }

      res.status(401).json({ error: 'Falha na autenticação' });
    } catch (err) {
      res.status(500).json({ error: 'Erro na autenticação' });
    }
  };



  
  


