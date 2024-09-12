import EmpSkillMapService from "../services/emp-skill-mapping.service";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api-response";

export default class EmpSkillMapController {
    
    public _empSkillMapService:EmpSkillMapService;

    constructor(empSkillMapService:EmpSkillMapService){
        this._empSkillMapService = empSkillMapService;
    }

    async createNewEmpSkillMapping(req: Request, res: Response, next: NextFunction){
        try {
            const empId = req.body.empId;
            const skillId = req.body.skillId;
            
            const newEmpSkillMapping = await this._empSkillMapService.createNewMapping(empId, skillId);
            return res.status(201).json(new ApiResponse(200, newEmpSkillMapping, 'New employee skill mapping created'))
        } catch (error) {
            next(error)
        }
    }
}