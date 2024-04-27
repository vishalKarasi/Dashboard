import { Router } from "express";
import {
  getFilteredInsight,
  getGraphicData,
  getInsight,
} from "../controllers/insightController.js";

const router = Router();

router.get("/", getInsight);
router.get("/filters", getFilteredInsight);
router.get("/graphics", getGraphicData);

export default router;
