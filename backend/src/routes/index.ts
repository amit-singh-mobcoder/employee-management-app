import express from 'express'
import skillRoutes from './skill.routes'
import employeeRoutes from './employee.routes'
import empSkillMapRoutes from './emp-skill-mapping.routes'

const router = express.Router()

router.use(skillRoutes)
router.use(employeeRoutes)
router.use(empSkillMapRoutes)

export default router;

