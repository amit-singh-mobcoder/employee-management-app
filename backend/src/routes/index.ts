import express from 'express'
import skillRoutes from './skill.routes'
import employeeRoutes from './employee.routes'
import empSkillMapRoutes from './emp-skill-mapping.routes'
import dashboardRoutes from './dashboard.routes'

const router = express.Router()

router.use(skillRoutes)
router.use(employeeRoutes)
router.use(empSkillMapRoutes)
router.use(dashboardRoutes)

export default router;

