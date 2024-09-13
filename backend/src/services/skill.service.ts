import SkillRepository from "../repositories/skill.repository";
import { ApiError } from "../utils/api-error";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { Messages } from "../utils/messages";

export default class SkillService {
   
    public skillRepository: SkillRepository;

    constructor(skillRepository: SkillRepository){
        
        this.skillRepository = skillRepository;
    }

    async addNewSkill(name: string){
        
        if(!name){
            throw new ApiError(HttpStatusCodes.BAD_REQUEST, Messages.SKILL.MISSING_FIELDS)
        }

        const existedSkill = await this.skillRepository.findSkillBySkillName(name.toUpperCase());
        if(existedSkill){
            throw new ApiError(HttpStatusCodes.CONFLICT, Messages.SKILL.NAME_EXISTS)
        }

        const newSkill = await this.skillRepository.addSkill(name);
        return newSkill;
    }

    async getSkills(){
        const skills = await this.skillRepository.getSkills();
        return skills;
    }
}