import mongoose from "mongoose";

const employeeSkillMappingSchema = new mongoose.Schema(
    {
        empId:{
            type:Number,
            required: true,
        },
        skillId:{
            type:Number,
            required: true
        }
    }
)

export const EmpSkillMapModel = mongoose.model('emp-skill-mapping', employeeSkillMappingSchema)