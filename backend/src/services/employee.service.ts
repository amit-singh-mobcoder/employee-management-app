import axios from "axios";
import EmployeeRepository from "../repositories/employee.repository";
import EmpSkillMapRepository from "../repositories/emp-skill-mapping.repository";
import { ApiError } from "../utils/api-error";

export default class EmployeeService {
    public _employeeRepository:EmployeeRepository;
    public _empSkillMapRepository:EmpSkillMapRepository;

    constructor(employeeRepository: EmployeeRepository, empSkillMapRepository: EmpSkillMapRepository){
        this._employeeRepository = employeeRepository;
        this._empSkillMapRepository = empSkillMapRepository;
    }

    async addNewEmp(empId:number,name:string, email:string, skills:number[]){
        
        if(!empId || !name || !email || !skills ){
            throw new ApiError(400, 'All fields are required, [empId, name, email, skills]')
        }

        let existedEmployee;
        existedEmployee = await this._employeeRepository.findEmployeeByEmail(email);
        if(existedEmployee){
            throw new ApiError(409, 'Employee with this email already exist')
        }
        existedEmployee = await this._employeeRepository.findEmployeeByEmpId(empId);
        if(existedEmployee){
            throw new ApiError(409, 'Employee with this empId already exist')
        }

        const employee = await this._employeeRepository.addNewEmployee(empId, name, email, skills);

        const skillMappings = skills.map(skillId => this._empSkillMapRepository.addNewMapping(empId, skillId));
        await Promise.all(skillMappings);
        
        return employee;

    }
}