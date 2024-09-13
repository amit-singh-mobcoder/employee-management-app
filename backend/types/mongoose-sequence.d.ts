declare module 'mongoose-sequence' {
    import { Mongoose, Schema } from 'mongoose';
  
    function mongooseSequence(mongoose: Mongoose): (schema: Schema, options?: any) => void;
  
    export = mongooseSequence;
}
  