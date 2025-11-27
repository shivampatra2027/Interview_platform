// src/controllers/report.controller.js
import Report from "../models/report.model.js";
import { success } from "../utils/response.js";


export const generateReport = async (req, res, next) => {
  try {
    const { interviewId, summary, score, details } = req.body;
    const newReport = await Report.create({
      user: req.user._id,
      interview: interviewId,
      summary: summary || "",
      overallScore: score ?? null,
      details: details || {}
    });

    return success(res, { report: newReport }, "Report generated!");
  } catch (error) {
    next(error);
  }
};

export const getMyReport = async (req, res, next) => {
  try {
    const userId = req.user && req.user._id ? req.user._id : null;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID not found in request" });
    }

    const reports = await Report.find({ user: userId })
      .populate("interview", "title position difficultyLevel status overallScore")
      .sort({ createdAt: -1 });

    return success(res, { reports }, "Reports fetched!");
  } catch (error) {
    next(error);
  }
};
export const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findOne({ _id: id, user: req.user._id }).populate("interview");
    if (!report) {
      return res.status(404).json({ success: false, message: "No report found!" });
    }
    return success(res, { report }, "Report fetched!");
  } catch (error) {
    next(error);
  }
};

/**
 * Get reports for a specific interview (for the logged-in user)
 */
export const getReportForInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.params; // or req.query depending on routes
    if (!interviewId) {
      return res.status(400).json({ success: false, message: "Interview ID is required" });
    }

    const reports = await Report.find({ interview: interviewId, user: req.user._id })
      .populate("interview", "title position difficultyLevel status overallScore")
      .sort({ createdAt: -1 });

    return success(res, { reports }, "Reports for interview fetched!");
  } catch (error) {
    next(error);
  }
};
export const listUserReports = async (req, res, next) => {
  try {
    const reports = await Report.find({})
      .populate("interview", "title position difficultyLevel status overallScore")
      .sort({ createdAt: -1 });

    return success(res, { reports }, "All user reports fetched!");
  } catch (error) {
    next(error);
  }
};
