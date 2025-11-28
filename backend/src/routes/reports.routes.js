//report.routes..
// src/routes/report.routes.js
import express from "express";
import {
  generateReport,
  getReportById,
  getReportForInterview,
  listUserReports
} from "../controllers/report.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js"; 

const router = express.Router();
router.post("/generate", authMiddleware, generateReport);
router.get("/", authMiddleware, listUserReports);
router.get("/:reportId", authMiddleware, getReportById);
router.get("/interview/:interviewId", authMiddleware, getReportForInterview);

export default router;
