import {Request, Response, NextFunction} from 'express'
import SkillService from "../services/skill.service";
import { ApiResponse } from '../utils/api-response';

export default class SkillController {

    public skillService: SkillService;

    constructor(skillService: SkillService){
        this.skillService = skillService;
    }

    async createNewSkill(req: Request, res: Response, next: NextFunction){
        try {
            const skillId = req.body.skillId;
            const skillName = req.body.name;

            const skill = await this.skillService.addNewSkill(skillId, skillName);
            return res.status(201).json(new ApiResponse(200, skill, 'New skill created successfully'))
        } catch (error) {
            next(error)
        }
    }
}