import mongoose, { Schema } from "mongoose";


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
  file_Name_fs1: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  file_Type_fs1: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  file_Upload_fs1: {
    type: String,
    required: true,
    trim: true,
  },
  file_Name_fs2: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  file_Type_fs2: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  file_Upload_fs2: {
    type: String, 
    required: true,
    trim: true,
  },
});

export default mongoose.model("UserDetail", userDetailSchema);


