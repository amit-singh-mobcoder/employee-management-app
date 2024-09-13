import EmployeeService from "../services/employee.service";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api-response";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

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
            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, newEmployee, Messages.EMPLOYEE.CREATE_SUCCESS))
        } catch (error) {
            next(error)
        }
    }

    async getEmployees(req:Request, res:Response, next:NextFunction){
        try {
            const employess = await this._employeeService.getEmployees();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, employess, Messages.EMPLOYEE.LIST_FETCHED))

        } catch (error) {
            next(error)
        }
    }

    async filteredEmployeeBySkills(req: Request, res:Response, next:NextFunction){
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
            const response = await this._employeeService.filteredEmployeeBySkills(skillIds, employees);
    
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, response, `Filtered ${Messages.EMPLOYEE.LIST_FETCHED}`));
    
        } catch (error) {
            next(error);
        }
    }
}