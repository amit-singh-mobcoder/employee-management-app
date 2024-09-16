import DashboardController from "../controllers/dashboard.controller";
import express from 'express'
import EmployeeRepository from "../repositories/employee.repository";
import SkillRepository from "../repositories/skill.repository";
import DashboardService from "../services/dashboard.service";
const router = express.Router();

const employeeRepository = new EmployeeRepository()
const skillRepository = new SkillRepository()
const dashboardService = new DashboardService(employeeRepository, skillRepository);
const dashboardController = new DashboardController(dashboardService);

router.route('/dashboard').get(dashboardController.employeeSkillRatio.bind(dashboardController))

export default router;