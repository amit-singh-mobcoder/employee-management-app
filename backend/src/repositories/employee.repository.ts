import { ObjectId } from "mongoose";
import { EmployeeModel } from "../models/employee.model";

export default class EmployeeRepository{

    async addNewEmployee(empId:number, name:string, email:string, skills:number[]){
        const newEmployee = new EmployeeModel({empId,name, email, skills})
        return await newEmployee.save()
    }

    async findEmployeeByEmail(email:string){
        const existedEmployee = await EmployeeModel.findOne({email})
        return existedEmployee;
    }

    async findEmployeeByEmpId(id: number){
        const existedEmployee = await EmployeeModel.findOne({empId: id})
        return existedEmployee;
    }

    async findEmployeeByObjectIdAndUpdateSkills(id: string, skillId: number){
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, {$addToSet: {skills: skillId}}, {new: true});
        return updatedEmployee;
    }
}