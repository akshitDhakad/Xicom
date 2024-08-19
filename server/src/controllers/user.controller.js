// controllers/userController.js

import UserDetail from "../models/user.model.js";


export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      ressAddress,
      perAddress,
    } = req.body;

    // Handle file uploads
    const file1 = req.files?.file1 ? req.files.file1[0].path : null;
    const file2 = req.files?.file2 ? req.files.file2[0].path : null;

    const userDetail = new UserDetail({
      fullName: `${firstName} ${lastName}`,
      email: email.trim().toLowerCase(),
      dob: dob.trim().toLowerCase(),
      resAddress: ressAddress.trim().toLowerCase(),
      perAddress: perAddress.trim().toLowerCase(),
      file1,
      file2,
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
