// controllers/userController.js

import UserDetail from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, ressAddress, perAddress } =
      req.body;

    // Handle multiple file uploads
    const files = req.files ? req.files.map((file) => file.path) : [];

    const userDetail = new UserDetail({
      fullName: `${firstName} ${lastName}`,
      email: email.trim().toLowerCase(),
      dob: dob.trim().toLowerCase(),
      resAddress: JSON.parse(ressAddress),
      perAddress: JSON.parse(perAddress),
      files,
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
