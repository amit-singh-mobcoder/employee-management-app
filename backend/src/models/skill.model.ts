import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        skillId:{
            type:Number,
            required: true,
            unique: true,
        },
        name: {
            type:String,
            required: true,
        }
    }
)

export const SkillModel = mongoose.model('Skill', skillSchema);