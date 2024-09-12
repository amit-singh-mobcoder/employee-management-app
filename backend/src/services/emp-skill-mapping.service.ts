import EmpSkillMapRepository from "../repositories/emp-skill-mapping.repository";
import EmployeeRepository from "../repositories/employee.repository";
import SkillRepository from "../repositories/skill.repository";
import { ApiError } from "../utils/api-error";

export default class EmpSkillMapService{

    public _empSkillMapRepository: EmpSkillMapRepository;
    public _employeeRepository:EmployeeRepository;
    public _skillRepository:SkillRepository;

    constructor(empSkillMapRepository: EmpSkillMapRepository, employeeRepository: EmployeeRepository, skillRepository: SkillRepository){
        this._empSkillMapRepository = empSkillMapRepository;
        this._employeeRepository = employeeRepository;
        this._skillRepository = skillRepository;
    }

    async createNewMapping(empId:number, skillId:number){

        if(!empId || !skillId){
            throw new ApiError(400, 'All fields are required, [empId, skillId]')
        }
        // check skillId is valid or not
        const skill = await this._skillRepository.findSkillBySkillId(skillId);
        if(!skill){
            throw new ApiError(404, 'invalid skill id')
        }
        
        // check empId is valid or not
        const employee: any = await this._employeeRepository.findEmployeeByEmpId(empId);
        if(!employee){
            throw new ApiError(404, 'invalid employee id')
        }
        
        const isMappingExist = await this._empSkillMapRepository.findMappingWithEmpIdAndSkillId(empId, skillId);
        if(isMappingExist){
            throw new ApiError(409, 'employee-skill mapping already exist')
        }
        // also add this skillId in the skills array of employee object
        const _id = await employee._id.toHexString();
        const updateEmployee = await this._employeeRepository.findEmployeeByObjectIdAndUpdateSkills(_id, skillId);
        if(!updateEmployee){
            throw new ApiError(400, 'error while updating employee skills')
        }

        const newMapping = await this._empSkillMapRepository.addNewMapping(empId, skillId);
        return newMapping;
    }
}