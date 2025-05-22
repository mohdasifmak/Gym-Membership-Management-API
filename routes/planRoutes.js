const router = require('express').Router();
const { auth, admin } = require('../middlewares/auth');
const {
  getPlans, addPlan, updatePlan, deletePlan
} = require('../controllers/planController');

router.get('/', auth, getPlans);
router.post('/', auth, admin, addPlan);
router.put('/:id', auth, admin, updatePlan);
router.delete('/:id', auth, admin, deletePlan);

module.exports = router;
