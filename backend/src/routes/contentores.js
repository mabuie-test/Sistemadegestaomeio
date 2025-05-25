const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const audit = require('../middlewares/auditMiddleware');
const {
  listar,
  criar,
  atualizarNivel
} = require('../controllers/containerController');

router.get('/', auth, audit, listar);
router.post('/', auth, role(['admin']), audit, criar);
router.put('/:id/nivel', auth, role(['admin']), audit, atualizarNivel);

module.exports = router;
