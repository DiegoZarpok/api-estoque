const Product = require('../models/Product');

// Util: normaliza campos do body (pt -> en)
function normalizeBody(body) {
  const name = body.name;
  const price = body.price ?? body.preco;
  const quantity = body.quantity ?? body.quantidade;
  return { name, price, quantity };
}

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = normalizeBody(req.body);
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ message: 'Campos obrigatórios: name, preco/price, quantidade/quantity' });
    }
    const product = await Product.create({ name, price, quantity });
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao criar produto', error: err.message });
  }
};

// READ ALL
exports.getProducts = async (_req, res) => {
  try {
    const products = await Product.find().lean();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao listar produtos', error: err.message });
  }
};

// READ ONE
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ message: 'ID inválido', error: err.message });
  }
};

// UPDATE (substitui campos presentes no body)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity } = normalizeBody(req.body);
    const data = {};
    if (name !== undefined) data.name = name;
    if (price !== undefined) data.price = price;
    if (quantity !== undefined) data.quantity = quantity;

    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao atualizar', error: err.message });
  }
};

// REPLACE (PUT completo: exige todos os campos)
exports.replaceProduct = async (req, res) => {
  try {
    const { name, price, quantity } = normalizeBody(req.body);
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ message: 'PUT completo exige: name, preco/price, quantidade/quantity' });
    }
    const replaced = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true, runValidators: true, overwrite: true }
    );
    if (!replaced) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json(replaced);
  } catch (err) {
    return res.status(400).json({ message: 'Erro no replace', error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' });
    return res.json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    return res.status(400).json({ message: 'Erro ao deletar', error: err.message });
  }
};
