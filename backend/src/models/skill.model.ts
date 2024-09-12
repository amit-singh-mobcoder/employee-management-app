import mongoose, { Document, Schema } from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment'; 

interface ISkill extends Document {
  skillId: number;
  name: string;
}

const skillSchema: Schema = new mongoose.Schema(
  {
    skillId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase:true
    },
  }
);

skillSchema.plugin(AutoIncrementID, { field: 'skillId', startAt: 1, incrementBy: 1, modelName: 'Skill' });

export const SkillModel = mongoose.model<ISkill>('Skill', skillSchema);
