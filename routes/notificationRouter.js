const router = require('express').Router()
const NotificationCtrl = require('../controllers/notificationCtrl')


router.route('/notification')
    .get(NotificationCtrl.getNotifications)


router.route('/notification/:id')
    .delete(NotificationCtrl.deleteNotifications)

module.exports = router