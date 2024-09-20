import mongoose, {Schema, Document} from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose)

interface IEmployee extends Document {
    empId:number;
    name:string;
    email:string;
    skills:number[];
    isDeleted:boolean;
    status:string
}

const employeeSchema: Schema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        skills: {
            type: [Number],
            required: true,
        },
        isDeleted:{
            type:Boolean,
            default: false
        },
        status: {
            type:String,
            enum:['active', 'inactive'],
            default: 'active'
        }
    },
    {timestamps: true}
)

employeeSchema.plugin(AutoIncrement, {inc_field: 'empId'})

employeeSchema.index({ email: 1})
employeeSchema.index({ empId: 1})

export const EmployeeModel = mongoose.model<IEmployee>('Employee', employeeSchema)