import mongoose from 'mongoose';

const { Schema } = mongoose;

const novelSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  summary: { type: String },
  rank: { type: Number },
  status: { type: String },
  categories: { type: Array },
  chapters: { type: Number },
  comments: { type: Array },
});

const NovelModel = mongoose.model('Novels', novelSchema);

export default NovelModel;
