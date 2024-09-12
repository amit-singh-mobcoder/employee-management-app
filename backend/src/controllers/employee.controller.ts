import EmployeeService from "../services/employee.service";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api-response";

export default class EmployeeController {
    public _employeeService:EmployeeService;

    constructor(employeeService: EmployeeService){
        this._employeeService = employeeService;
    }

    async createNewEmployee(req:Request, res:Response, next:NextFunction){
        try {
            const empId = req.body.empId;
            const name = req.body.name;
            const email = req.body.email;
            const skills = req.body.skills;

            const newEmployee = await this._employeeService.addNewEmp(empId, name, email, skills);
            return res.status(201).json(new ApiResponse(200, newEmployee, 'New employee created successfully'))
        } catch (error) {
            next(error)
        }
    }
}