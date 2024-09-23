import express from 'express'
import EmployeeRepository from '../repositories/employee.repository'
import EmployeeService from '../services/employee.service'
import EmployeeController from '../controllers/employee.controller'
import SkillRepository from '../repositories/skill.repository'

const skillRepository = new SkillRepository()
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository, skillRepository);
const employeeController = new EmployeeController(employeeService);

const router = express.Router()

router.route('/employee').post(employeeController.createNewEmployee.bind(employeeController))
router.route('/employee').get(employeeController.getEmployees.bind(employeeController))
router.route('/employees').get(employeeController.filteredEmployeeBySkills.bind(employeeController))
router.route('/employees/skills').get(employeeController.getEmployeesWithSkillName.bind(employeeController))
router.route('/employee/:id').patch(employeeController.updateEmployee.bind(employeeController))
router.route('/employee/:id').delete(employeeController.deleteEmployee.bind(employeeController))
router.route('/employee/:id/status').patch(employeeController.updateEmployeeStatus.bind(employeeController));

export default router;