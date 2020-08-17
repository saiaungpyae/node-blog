import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

schema.index({ title: 1 }, { unique: true })

export default mongoose.model('Tag', schema);
