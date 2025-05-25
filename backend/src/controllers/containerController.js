const Contentor = require('../models/Contentor');

exports.listar = async (req, res) => {
  req.targetCollection = 'contentores';
  const lista = await Contentor.find();
  res.json(lista);
};

exports.criar = async (req, res) => {
  req.targetCollection = 'contentores';
  const novo = await Contentor.create(req.body);
  res.status(201).json(novo);
};

exports.atualizarNivel = async (req, res) => {
  const { nivel } = req.body;
  const contentor = await Contentor.findById(req.params.id);
  if (!contentor) return res.status(404).json({ erro: 'Contentor não encontrado.' });

  req.getStateBefore = () => contentor.toObject();

  contentor.nivel = nivel;
  contentor.estado = nivel >= 100 ? 'cheio' : (nivel > 0 ? 'em_uso' : 'vazio');
  contentor.ultAtualizacao = Date.now();

  await contentor.save();
  req.getStateAfter = () => contentor.toObject();

  if (contentor.estado === 'cheio') {
    // alertService.enviarAlerta(contentor);
  }

  res.json(contentor);
};
