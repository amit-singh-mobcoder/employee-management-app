import { EmpSkillMapModel } from "../models/emp-skill-mapping.model";

export default class EmpSkillMapRepository {

    async addNewMapping(empId:number, skillId:number){
        const newMapping = new EmpSkillMapModel({empId, skillId})
        return newMapping.save();
    }

    async findMappingWithEmpIdAndSkillId(empId:number, skillId:number){
        const existedMapping = await EmpSkillMapModel.findOne({empId, skillId})
        return existedMapping;
    }
}