import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  filePath: {
    type: String,
    required: true,
    trim: true,
  },
});

const userDetailSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  resAddress: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  perAddress: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },

  files: [fileSchema],
});

export default mongoose.model("UserDetail", userDetailSchema);
