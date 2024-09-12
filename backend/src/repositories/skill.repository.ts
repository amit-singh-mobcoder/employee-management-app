import { SkillModel } from '../models/skill.model'

export default class SkillRepository {

    async addSkill(name: string){
        const newSkill = new SkillModel({name})
        return await newSkill.save()
    }

    async findSkillBySkillName(name: string){
        const skill = await SkillModel.findOne({name})
        return skill;
    }

    async findSkillBySkillId(skillId: number){
        const skill = await SkillModel.findOne({skillId})
        return skill;
    }

    async getSkills(){
        const skills = await SkillModel.find();
        return skills;
    }
}