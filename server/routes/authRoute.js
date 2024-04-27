import { Router } from "express";
import {
  login,
  refresh,
  logout,
  register,
} from "../controllers/authController.js";
import { imgParser } from "../middlewares/multer.js";

const router = Router();

router.post("/register", imgParser.single("profilePic"), register);
router.post("/login", imgParser.none(), login);
router.post("/logout", logout);
router.get("/refresh", refresh);

export default router;
