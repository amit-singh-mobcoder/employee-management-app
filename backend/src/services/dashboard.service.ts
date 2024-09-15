import EmployeeRepository from "../repositories/employee.repository"
import SkillRepository from "../repositories/skill.repository"
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";

export default class DashboardService {
    public _employeeRepository: EmployeeRepository;
    public _skillRepository: SkillRepository;

    constructor(employeeRepository:EmployeeRepository, skillRepository: SkillRepository){
        this._employeeRepository = employeeRepository;
        this._skillRepository = skillRepository;
    }

    async employeeSkillRatio(){
        const skillList = await this._skillRepository.getSkills();
        const employeeList = await this._employeeRepository.getEmployees();
        
        if(skillList.length === 0 || employeeList.length === 0){
            throw new ApiError(HttpStatusCodes.NOT_FOUND, 'Data is not available')
        }
        let result = []

        for(let skill of skillList){
            const skillName = skill.name;
            const skillId = skill.skillId;
            let empSkillCount = 0;

            for(let emp of employeeList){

                const empSkillArray = emp.skills;

                if(empSkillArray.includes((skillId))){
                    empSkillCount++;
                }
            }

            result.push({name: skillName, empCount: empSkillCount});
        }

        return result;
    }
}