import express from 'express'
import skillRoutes from './skill.routes'
const router = express.Router()

router.use(skillRoutes)

export default router;

