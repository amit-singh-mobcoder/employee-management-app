import mongoose, { Document, Schema } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

interface ISkill extends Document {
  skillId: number;
  name: string;
}

const skillSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
  }
);

skillSchema.plugin(AutoIncrement, {inc_field:'skillId'})

export const SkillModel = mongoose.model<ISkill>('Skill', skillSchema);
