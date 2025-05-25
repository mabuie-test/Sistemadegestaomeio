const User = require('../models/User');

exports.listar = async (req, res) => {
  const users = await User.find().select('-senhaHash');
  res.json(users);
};

exports.obter = async (req, res) => {
  const user = await User.findById(req.params.id).select('-senhaHash');
  if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' });
  res.json(user);
};

exports.atualizar = async (req, res) => {
  const updates = req.body;
  if (updates.senha) updates.senhaHash = updates.senha;
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ mensagem: 'Utilizador atualizado.', user });
};

exports.remover = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ mensagem: 'Utilizador eliminado.' });
};
