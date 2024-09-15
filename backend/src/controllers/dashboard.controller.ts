import DashboardService from "../services/dashboard.service"
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../utils/http-status-codes";
import { ApiResponse } from "../utils/api-response";

export default class DashboardController {
    public _dashboardService: DashboardService;

    constructor(dashboardService: DashboardService){
        this._dashboardService = dashboardService;
    }

    async employeeSkillRatio(req:Request, res:Response, next:NextFunction){
        try {
            const response = await this._dashboardService.employeeSkillRatio();
            return res.status(HttpStatusCodes.OK).json(new ApiResponse(HttpStatusCodes.OK, response, 'employee skill ratio fetched successfully'))
            
        } catch (error) {
            next(error)
        }
    }
}