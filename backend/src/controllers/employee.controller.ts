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
            const name = req.body.name;
            const email = req.body.email;
            const skills = req.body.skills;

            const newEmployee = await this._employeeService.addNewEmp(name, email, skills);
            return res.status(201).json(new ApiResponse(200, newEmployee, 'New employee created successfully'))
        } catch (error) {
            next(error)
        }
    }

    async getEmployees(req:Request, res:Response, next:NextFunction){
        try {
            const employess = await this._employeeService.getEmployees();
            return res.status(200).json(new ApiResponse(200, employess, 'employees list fetched successfully'))

        } catch (error) {
            next(error)
        }
    }

    async fiteredEmployeeBySkills(req: Request, res:Response, next:NextFunction){
        try {
            const queryParams = req.query;
    
            // Convert query parameters to numbers
            const idsObj = Object.keys(queryParams).reduce((acc: { [key: string]: number | null }, key) => {
                const value = Number(queryParams[key]);
                acc[key] = isNaN(value) ? null : value;
                return acc;
            }, {});
    
            // Collect valid skill IDs into an array
            const skillIds: number[] = [];
            for (let key in idsObj) {
                if (idsObj[key] !== null) {
                    skillIds.push(idsObj[key] as number);
                }
            }

            const employees = await this._employeeService.getEmployees();
            const response = await this._employeeService.fiteredEmployeeBySkills(skillIds, employees);
    
            return res.status(200).json(new ApiResponse(200, response, 'Filtered employees by skills'));
    
        } catch (error) {
            next(error);
        }
    }
}