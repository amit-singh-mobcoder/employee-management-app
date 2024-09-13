import {Request, Response, NextFunction} from 'express'
import SkillService from "../services/skill.service";
import { ApiResponse } from '../utils/api-response';
import { HttpStatusCodes } from '../utils/http-status-codes';
import { Messages } from '../utils/messages';

export default class SkillController {

    public skillService: SkillService;

    constructor(skillService: SkillService){
        this.skillService = skillService;
    }

    async createNewSkill(req: Request, res: Response, next: NextFunction){
        try {
            const skillName = req.body.name;
            const skill = await this.skillService.addNewSkill(skillName);
            return res.status(HttpStatusCodes.CREATED).json(new ApiResponse(HttpStatusCodes.OK, skill, Messages.SKILL.CREATE_SUCCESS))
        } catch (error) {
            next(error)
        }
    }

    async getskills(req:Request, res:Response, next:NextFunction){
        try {
            const skills = await this.skillService.getSkills();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, skills, Messages.SKILL.LIST_FETCHED))
        } catch (error) {
            next(error)
        }
    }
}