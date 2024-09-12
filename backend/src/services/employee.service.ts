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

    async addNewEmp(name:string, email:string, skills:number[]){
        
        if(!name || !email || !skills ){
            throw new ApiError(400, 'All fields are required, [name, email, skills]')
        }

        let existedEmployee;
        existedEmployee = await this._employeeRepository.findEmployeeByEmail(email);
        if(existedEmployee){
            throw new ApiError(409, 'Employee with this email already exist')
        }

        const employee = await this._employeeRepository.addNewEmployee(name, email, skills);


        const skillMappings = skills.map(skillId => this._empSkillMapRepository.addNewMapping(employee.empId, skillId));
        await Promise.all(skillMappings);
        
        return employee;

    }

    async getEmployees(){
        const employess = await this._employeeRepository.getEmployees();
        if(!employess){
            throw new ApiError(503, 'error while get employees')
        }
        return employess;
    }

    async fiteredEmployeeBySkills(skillIds:number[], employees:Array<any>){
        const filteredEmployees = [];

        for(let i=0; i<skillIds.length; i++){
            const skillID = skillIds[i];

            for(let j=0; j<employees.length; j++){
                const employee = employees[j];
                const empSkill = employee.skills;

                for(let k=0; k<empSkill.length; k++){

                    if(empSkill[k] === skillID){
                        console.log('employee skill: ',empSkill[k])

                        filteredEmployees.push(employee)
                    }
                }
            }
        }

        return filteredEmployees;     
    }

}