import express from 'express'
import DevotionalRoutes from './devotional'
import EventRoutes from './event'
import AdminRoutes from './admin'
import TestimonyRoutes from './testimony'
import UserRoutes from './user'

const router = express.Router()

router.use('/devotional', DevotionalRoutes)
router.use('/event', EventRoutes)
router.use('/admin', AdminRoutes)
router.use('/testimony', TestimonyRoutes)
router.use('/user', UserRoutes)

export default router
