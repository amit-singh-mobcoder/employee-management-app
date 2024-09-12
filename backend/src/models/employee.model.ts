import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        empId:{
            type:Number,
            required: true,
        },
        name:{
            type:String,
            required: true,
        },
        email:{
            type:String,
            required:true,
        }
    },
    {timestamps: true}
)

const EmployeeModel = mongoose.model('Employee', employeeSchema)