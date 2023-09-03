const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, type } = req.body;
    const product = new Product({ name, price, description, type });
    await product.save();
    res.status(201).json({ message: 'Produto criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar os produtos' });
    }
  }
  
  exports.getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao recuperar o produto' });
    }
  }

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
      const { name, price, description, type } = req.body;
      const product = await Product.findByIdAndUpdate(productId, { name, price, description, type }, { new: true });
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto atualizado com sucesso!', product });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
  }

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findByIdAndRemove(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto excluído com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir o produto' });
    }
  }
  
  exports.updateProductsByType = async (req, res) => {
    const { type } = req.params;
    const { discount } = req.body;
  
    try {

      const productsToUpdate = await Product.updateMany(
        { type },
        { $set: { discount } }
      );
  
      if (productsToUpdate.nModified === 0) {
        return res.status(404).json({ error: 'Nenhum produto do tipo especificado encontrado' });
      }
  
      res.json({ message: 'Produtos atualizados com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar produtos em lote' });
    }
  };


