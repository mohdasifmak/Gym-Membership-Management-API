const router = require('express').Router();
const { auth, admin } = require('../middlewares/auth');
const {
  getAllUsers, getProfile, updateProfile, deleteUser
} = require('../controllers/userController');

router.get('/', auth, admin, getAllUsers);
router.get('/:id', auth, getProfile);
router.put('/:id', auth, updateProfile);
router.delete('/:id', auth, deleteUser);

module.exports = router;
