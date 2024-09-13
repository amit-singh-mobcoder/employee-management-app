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
            const skillName = req.body.name;

            const skill = await this.skillService.addNewSkill(skillName);
            return res.status(201).json(new ApiResponse(200, skill, 'New skill created successfully'))
        } catch (error) {
            next(error)
        }
    }

    async getskills(req:Request, res:Response, next:NextFunction){
        try {
            const skills = await this.skillService.getSkills();
            return res.status(200).json(new ApiResponse(200, skills, 'skills list fetched successfully'))
        } catch (error) {
            next(error)
        }
    }
}