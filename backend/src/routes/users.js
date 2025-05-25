const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const audit = require('../middlewares/auditMiddleware');
const {
  listar,
  obter,
  atualizar,
  remover
} = require('../controllers/userController');

router.use(auth, role(['admin']), audit);

router.get('/', listar);
router.get('/:id', obter);
router.put('/:id', atualizar);
router.delete('/:id', remover);

module.exports = router;
