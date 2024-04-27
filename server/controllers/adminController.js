import { Admin } from "../models/adminModel.js";
import {
  cloudinaryUploader,
  handleCloudinaryUpload,
} from "../middlewares/cloudinary.js";
import bcrypt from "bcrypt";

// get admin by id
export const getAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id).select("name email profilePic");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
};

// update admin
export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    let profilePic;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const prevAdmin = await Admin.findById(id);

    if (req.file) {
      profilePic = await handleCloudinaryUpload(req.file.buffer);
      if (prevAdmin.profilePic) {
        await cloudinaryUploader.destroy(prevAdmin.profilePic);
      }
    }

    const newCredential = {
      name,
      email,
      password: hashPassword,
      profilePic,
    };

    const admin = await Admin.findByIdAndUpdate(id, newCredential, {
      new: true,
    }).select(" name email profilePic");

    res
      .status(200)
      .json({ message: "Update admin profile successfull", admin });
  } catch (error) {
    next(error);
  }
};

// delete admin
export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prevAdmin = await Admin.findById(id);

    if (prevAdmin.profilePic) {
      await cloudinaryUploader.destroy(prevAdmin.profilePic);
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};
