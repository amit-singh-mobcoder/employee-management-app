import SkillRepository from "../repositories/skill.repository";
import { ApiError } from "../utils/api-error";

export default class SkillService {
   
    public skillRepository: SkillRepository;

    constructor(skillRepository: SkillRepository){
        
        this.skillRepository = skillRepository;
    }

    async addNewSkill(name: string){
        
        if(!name){
            throw new ApiError(400, 'skill name is required')
        }

        const existedSkill = await this.skillRepository.findSkillBySkillName(name.toUpperCase());
        if(existedSkill){
            throw new ApiError(409, 'Skill already exist')
        }

        const newSkill = await this.skillRepository.addSkill(name);
        return newSkill;
    }
}