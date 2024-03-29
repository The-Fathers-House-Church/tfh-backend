const express = require('express');
const DevotionalRoutes = require('./devotional');
const EventRoutes = require('./event');
const AdminRoutes = require('./admin');
const TestimonyRoutes = require('./testimony');
const FeedbackRoutes = require('./feedback');
const UserRoutes = require('./user');
const AnnouncementRoutes = require('./announcement');
const StatisticsRoutes = require('./statistics');
const TFCCCellRoutes = require('./tfccCell');
const TFCCZoneRoutes = require('./tfccZone');
const UnitRoutes = require('./unit');
const DepartmentRoutes = require('./department');
const ChurchRoutes = require('./churches');
const TFCCLeaderRoutes = require('./tfccLeader');
const VisitorRoutes = require('./visitor');
const AssignedFirstTImerRoutes = require('./assignedFirstTimer');
const AssignedSecondTImerRoutes = require('./assignedSecondTimer');
const BulletinSubscriberRoutes = require('./bulletinSubscribers');

const router = express.Router();

router.use('/devotional', DevotionalRoutes);
router.use('/event', EventRoutes);
router.use('/admin', AdminRoutes);
router.use('/testimony', TestimonyRoutes);
router.use('/feedback', FeedbackRoutes);
router.use('/user', UserRoutes);
router.use('/announcement', AnnouncementRoutes);
router.use('/statistics', StatisticsRoutes);
router.use('/tfcc', TFCCCellRoutes);
router.use('/tfcc/zone', TFCCZoneRoutes);
router.use('/tfcc/leader', TFCCLeaderRoutes);
router.use('/unit', UnitRoutes);
router.use('/department', DepartmentRoutes);
router.use('/church', ChurchRoutes);
router.use('/visitor', VisitorRoutes);
router.use('/assigned-first-timer', AssignedFirstTImerRoutes);
router.use('/assigned-second-timer', AssignedSecondTImerRoutes);
router.use('/bulletin/subscriber', BulletinSubscriberRoutes);

module.exports = router;
