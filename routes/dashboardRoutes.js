const router = require('express').Router();
const { auth, admin } = require('../middlewares/auth');
const { getStats } = require('../controllers/dashboardController');

router.get('/stats', auth, admin, getStats);

module.exports = router;
