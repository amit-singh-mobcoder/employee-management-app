import express from 'express'
import EmpSkillMapRepository from '../repositories/emp-skill-mapping.repository'
import EmployeeRepository from '../repositories/employee.repository'
import EmployeeService from '../services/employee.service'
import EmployeeController from '../controllers/employee.controller'

const empSkillMapRepository = new EmpSkillMapRepository()
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository, empSkillMapRepository);
const employeeController = new EmployeeController(employeeService);

const router = express.Router()

router.route('/employee').post(employeeController.createNewEmployee.bind(employeeController))
router.route('/employee').get(employeeController.getEmployees.bind(employeeController))
router.route('/employees').get(employeeController.filteredEmployeeBySkills.bind(employeeController))

export default router;