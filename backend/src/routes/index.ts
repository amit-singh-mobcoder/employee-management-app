import express from 'express'
import skillRoutes from './skill.routes'
import employeeRoutes from './employee.routes'
import dashboardRoutes from './dashboard.routes'

const router = express.Router()

router.use(skillRoutes)
router.use(employeeRoutes)
router.use(dashboardRoutes)

export default router;

