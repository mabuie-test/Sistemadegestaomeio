module.exports = (papelPermitido) => {
  return (req, res, next) => {
    if (!req.user || !papelPermitido.includes(req.user.role)) {
      return res.status(403).json({ erro: 'Permissão negada.' });
    }
    next();
  };
};
