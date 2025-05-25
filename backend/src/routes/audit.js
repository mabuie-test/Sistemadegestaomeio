const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const { consultar } = require('../controllers/auditController');

router.get('/', auth, role(['admin']), consultar);

module.exports = router;
