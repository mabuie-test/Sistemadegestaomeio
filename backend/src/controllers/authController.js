const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  const user = new User({ nome, email, senhaHash: senha });
  await user.save();
  res.status(201).json({ mensagem: 'Utilizador registado.' });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.compararSenha(senha))) {
    return res.status(401).json({ erro: 'Credenciais inválidas.' });
  }
  const payload = { id: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, role: user.role });
};
