import SkillRepository from "../repositories/skill.repository";
import { ApiError } from "../utils/api-error";

export default class SkillService {
   
    public skillRepository: SkillRepository;

    constructor(skillRepository: SkillRepository){
        
        this.skillRepository = skillRepository;
    }

    async addNewSkill(skillId: number, name: string){
        
        if(!skillId || !name){
            throw new ApiError(400, 'All field are required')
        }

        const newSkill = await this.skillRepository.addSkill(skillId, name);
        return newSkill;
    }
}