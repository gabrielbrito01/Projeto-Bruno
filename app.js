const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authenticate = require('./middleware/authenticate');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

mongoose.connect('mongodb://localhost:27017/projetobruno', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
  });

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

const promotionRoutes = require('./routes/promotionRoutes');
app.use('/promotion', promotionRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
