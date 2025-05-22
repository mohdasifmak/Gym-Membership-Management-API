const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  subscribeToPlan, getSubscriptions, cancelSubscription, freezeSubscription
} = require('../controllers/subscriptionController');

router.post('/', auth, subscribeToPlan);
router.get('/', auth, getSubscriptions);
router.patch('/:id/cancel', auth, cancelSubscription);
router.patch('/:id/freeze', auth, freezeSubscription);

module.exports = router;
