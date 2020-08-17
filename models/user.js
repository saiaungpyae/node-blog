import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', schema);
