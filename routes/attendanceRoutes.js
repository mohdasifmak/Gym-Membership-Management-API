const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  checkIn, todayAttendance, userAttendanceHistory, attendanceSummary
} = require('../controllers/attendanceController');

router.post('/', auth, checkIn);
router.get('/today', auth, todayAttendance);
router.get('/:userId', auth, userAttendanceHistory);
router.get('/summary/:userId', auth, attendanceSummary);

module.exports = router;
