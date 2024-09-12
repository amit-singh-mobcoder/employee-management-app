import mongoose, {Schema, Document} from "mongoose";

interface IEmpSkillMap extends Document {
    empId:number;
    skillId:number;
}

const employeeSkillMappingSchema: Schema = new mongoose.Schema(
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

export const EmpSkillMapModel = mongoose.model<IEmpSkillMap>('emp-skill-mapping', employeeSkillMappingSchema)