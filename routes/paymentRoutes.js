const router = require('express').Router();
const { auth, admin } = require('../middlewares/auth');
const {
  recordPayment, viewAllPayments, paymentDetails, generateInvoice
} = require('../controllers/paymentController');

router.post('/', auth, recordPayment);
router.get('/', auth, admin, viewAllPayments);
router.get('/:id', auth, paymentDetails);
router.get('/invoices/:userId', auth, generateInvoice);

module.exports = router;
