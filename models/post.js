import mongoose from 'mongoose';

import './user';
import './tag';

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const schema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    tags: [{
      type: ObjectId,
      ref: 'Tag'
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Post', schema);
