import mongoose, {Schema, Document} from "mongoose";

interface IEmployee extends Document {
    empId:number;
    name:string;
    email:string;
    skills:number[];
    isDeleted:boolean;
}

const employeeSchema: Schema = new mongoose.Schema(
    {
        empId:{
            type:Number,
            required: true,
            unique:true,
        },
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
        }
    },
    {timestamps: true}
)

employeeSchema.index({ email: 1})
employeeSchema.index({ empId: 1})

export const EmployeeModel = mongoose.model<IEmployee>('Employee', employeeSchema)