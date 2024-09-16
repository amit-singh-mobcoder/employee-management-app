import EmployeeRepository from "../repositories/employee.repository";
import EmpSkillMapRepository from "../repositories/emp-skill-mapping.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";
import SkillRepository from "../repositories/skill.repository";

export default class EmployeeService {
    public _employeeRepository:EmployeeRepository;
    public _empSkillMapRepository:EmpSkillMapRepository;
    public _skillRepository:SkillRepository;

    constructor(employeeRepository: EmployeeRepository, empSkillMapRepository: EmpSkillMapRepository, skillRepository: SkillRepository){
        this._employeeRepository = employeeRepository;
        this._empSkillMapRepository = empSkillMapRepository;
        this._skillRepository = skillRepository;
    }

    async addNewEmp(name:string, email:string, skills:number[]){
        
        if(!name || !email || !skills ){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.EMPLOYEE.MISSING_FIELDS)
        }

        let existedEmployee;
        existedEmployee = await this._employeeRepository.findEmployeeByEmail(email);
        if(existedEmployee){
            throw new ApiError(HttpStatusCodes.CONFLICT, Messages.EMPLOYEE.EMAIL_EXISTS)
        }

        const employee = await this._employeeRepository.addNewEmployee(name, email, skills);


        const skillMappings = skills.map(skillId => this._empSkillMapRepository.addNewMapping(employee.empId, skillId));
        await Promise.all(skillMappings);
        
        return employee;

    }

    async getEmployees(){
        const employees = await this._employeeRepository.getEmployees();
        if(!employees || employees.length === 0){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, Messages.EMPLOYEE.NOT_FOUND)
        }
        return employees;
    }

    async filteredEmployeeBySkills(skillIds: number[], employees: Array<any>) {
        
        const filteredEmployees = employees.filter(employee =>
          skillIds.every(skillId => employee.skills.includes(skillId))
        );

        const skillsList = await this._skillRepository.getSkills();
        const skillMap = new Map(skillsList.map(skill => [skill.skillId, skill.name]));

        const result = filteredEmployees.map(emp => {
            const empSkills = emp.skills.map((skillId: number) => skillMap.get(skillId) || 'Unknown Skill');

            return {
                name: emp.name,
                email: emp.email,
                skills: empSkills,
                isDeleted: emp.isDeleted,
                _id: emp._id,
                empId: emp.empId
            };

        })

        return result;
    }

    async getEmployeesWithSkillName() {
        const employeesList = await this._employeeRepository.getEmployees();
        const skillsList = await this._skillRepository.getSkills();
    
        // Skill lookup map for efficient access
        const skillMap = new Map(skillsList.map(skill => [skill.skillId, skill.name]));
    
        const result = employeesList.map(emp => {
            const empSkills = emp.skills.map(skillId => skillMap.get(skillId) || 'Unknown Skill');
    
            return {
                name: emp.name,
                email: emp.email,
                skills: empSkills,
                isDeleted: emp.isDeleted,
                _id: emp._id,
                empId: emp.empId
            };
        });
    
        return result;
    }
    

    

}