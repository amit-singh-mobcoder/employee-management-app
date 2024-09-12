import { SkillModel } from '../models/skill.model'

export default class SkillRepository {

    async addSkill(id: number, name: string){
        const newSkill = new SkillModel({skillId: id, name})
        return await newSkill.save()
    }
}