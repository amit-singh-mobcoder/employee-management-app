import { EmployeeModel } from "../models/employee.model";

export default class EmployeeRepository{

    async addNewEmployee(name:string, email:string, skills:number[]){
        const newEmployee = new EmployeeModel({name, email, skills})
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

    async getEmployees(){
        const employees = await EmployeeModel.find();
        return employees;
    }

    async findEmployeeByObjectIdAndUpdate(id: string, newDetails: {name: string, email:string, skills: number[]}){
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, {$set: {
            name: newDetails.name,
            email: newDetails.email,
            skills: newDetails.skills
        }}, {new: true})
        return updatedEmployee;
    }

    async findEmployeeById(id: string){
        const employee = await EmployeeModel.findById(id);
        return employee;
    }

    async findEmpByIdAndSoftDelete(id: string){
        await EmployeeModel.findByIdAndUpdate(id, {isDeleted: true})
    }

    async findByIdAndUpdateStatus(id: string, status: string){
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, {status}, {new: true})
        return updatedEmployee;
    }
}