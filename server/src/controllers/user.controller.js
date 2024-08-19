// controllers/userController.js

import UserDetail from "../models/user.model.js";


export const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      resAddress,
      perAddress,
      file_Name_fs1,
      file_Type_fs1,
      file_Upload_fs1,
      file_Name_fs2,
      file_Type_fs2,
      file_Upload_fs2,
    } = req.body;

    const userDetail = new UserDetail({
      name,
      email,
      dob,
      resAddress,
      perAddress,
      file_Name_fs1,
      file_Type_fs1,
      file_Upload_fs1: req.file.path,
      file_Name_fs2,
      file_Type_fs2,
      file_Upload_fs2: req.file.path,
    });

    await userDetail.save();
    res
      .status(201)
      .json({ message: "User details submitted successfully", userDetail });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating user details", details: error.message });
  }
};
