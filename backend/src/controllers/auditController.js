const AuditLog = require('../models/AuditLog');

exports.consultar = async (req, res) => {
  const { collection, id, page = 1, limit = 20 } = req.query;
  const filtro = { targetCollection: collection };
  if (id) filtro.targetId = id;
  const logs = await AuditLog.find(filtro)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(logs);
};
