import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  deleteAdmin,
  getAdmin,
  updateAdmin,
} from "../controllers/adminController.js";
import { imgParser } from "../middlewares/multer.js";

const router = Router();

router.get("/:id", verifyToken, getAdmin);
router.patch("/:id", imgParser.single("profilePic"), verifyToken, updateAdmin);
router.delete("/:id", verifyToken, deleteAdmin);

export default router;
