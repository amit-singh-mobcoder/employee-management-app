import express from 'express'
import EmpSkillMapRepository from '../repositories/emp-skill-mapping.repository'
import EmpSkillMapService from '../services/emp-skill-mapping.service'
import EmpSkillMapController from '../controllers/emp-skill-mapping.controller'
import EmployeeRepository from '../repositories/employee.repository'
import SkillRepository from '../repositories/skill.repository'

const router = express.Router()
const skillRepository = new SkillRepository()
const employeeRepository = new EmployeeRepository();
const empSkillMapRepository = new EmpSkillMapRepository();
const empSkillMapService = new EmpSkillMapService(empSkillMapRepository, employeeRepository, skillRepository);
const empSkillMapController = new EmpSkillMapController(empSkillMapService);

router.route('/skillmapping').post(empSkillMapController.createNewEmpSkillMapping.bind(empSkillMapController))

export default router;