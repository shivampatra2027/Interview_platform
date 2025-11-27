//report.servies...
// src/services/report.service.js
import mongoose from "mongoose";
import ReportModel from "../models/report.model.js";
import InterviewModel from "../models/interviewSession.model.js";
import AnswerModel from "../models/answer.model.js";

import { generateFinalReport as aiGenerateFinalReport } from "./ai.service.js";

/**
 * Report service
 * Responsibilities:
 *  - CRUD for reports
 *  - Generate a final report for an interview (delegates to ai.service)
 *  - List and fetch reports with pagination
 *
 * Note: controllers should handle auth/authorization. This service focuses on data integrity.
 */

async function validateObjectId(id, name = "id") {
  if (!mongoose.isValidObjectId(id)) throw new Error(`Invalid ${name}`);
}

/**
 * Create a report manually (if needed)
 */
async function createReport({ interviewId, strengths = [], weaknesses = [], recommendations = [], overallScore = 0, meta = {} } = {}) {
  await validateObjectId(interviewId, "interviewId");

  const report = await ReportModel.create({
    interview: interviewId,
    strengths,
    weaknesses,
    recommendations,
    overallScore,
    meta,
    createdAt: new Date()
  });

  // Optionally update interview overallScore
  await InterviewModel.findByIdAndUpdate(interviewId, { overallScore }, { new: true }).lean();

  return report.toObject();
}

/**
 * Generate a final report by delegating to ai.service and persist it.
 * Returns the persisted report doc.
 */
async function generateReportFromInterview(interviewId) {
  await validateObjectId(interviewId, "interviewId");

  // Ensure interview exists
  const interview = await InterviewModel.findById(interviewId).lean();
  if (!interview) throw new Error("Interview not found");

  // Let ai.service produce a report structure (it already creates a ReportModel in your ai.service)
  // But in case your ai.service only returns structured data, this wrapper will persist it.
  // We'll call ai.service.generateFinalReport which in your ai.service currently creates ReportModel itself.
  // To be defensive, handle both possibilities (returned doc vs structured object).
  const aiResp = await aiGenerateFinalReport(interviewId);

  // If ai.service already returned a saved mongoose doc (with _id), return it.
  if (aiResp && aiResp._id) {
    return aiResp;
  }

  // Otherwise expect structured object:
  const { strengths = [], weaknesses = [], recommendations = [], overallScore = 0, meta = {} } = aiResp || {};

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const reportDoc = await ReportModel.create(
      [
        {
          interview: interviewId,
          strengths,
          weaknesses,
          recommendations,
          overallScore,
          meta,
          createdAt: new Date()
        }
      ],
      { session }
    );

    await InterviewModel.findByIdAndUpdate(interviewId, { overallScore, endedAt: new Date() }, { session });

    await session.commitTransaction();
    // reportDoc is an array when using create with array
    return reportDoc[0].toObject();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

/**
 * Fetch a single report by id
 */
async function getReportById(reportId) {
  await validateObjectId(reportId, "reportId");
  const report = await ReportModel.findById(reportId).lean();
  if (!report) throw new Error("Report not found");
  return report;
}

/**
 * List reports with pagination and optional filters
 */
async function listReports({ page = 1, limit = 20, filter = {} } = {}) {
  const pageNo = Math.max(1, parseInt(page, 10) || 1);
  const perPage = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
  const skip = (pageNo - 1) * perPage;

  const query = { ...filter };
  const [total, items] = await Promise.all([
    ReportModel.countDocuments(query),
    ReportModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(perPage).lean()
  ]);

  return { total, page: pageNo, limit: perPage, items };
}

/**
 * Update a report partially
 */
async function updateReport(reportId, update = {}) {
  await validateObjectId(reportId, "reportId");
  const allowed = ["strengths", "weaknesses", "recommendations", "overallScore", "meta"];
  const payload = {};
  for (const k of allowed) if (k in update) payload[k] = update[k];

  if (Object.keys(payload).length === 0) throw new Error("No updatable fields provided");

  const updated = await ReportModel.findByIdAndUpdate(reportId, { $set: payload }, { new: true }).lean();
  if (!updated) throw new Error("Report not found");

  // If overallScore changed, reflect it on interview
  if (typeof payload.overallScore === "number" && updated.interview) {
    try {
      await InterviewModel.findByIdAndUpdate(updated.interview, { overallScore: payload.overallScore });
    } catch (err) {
      // Don't fail the update for interview update errors; log if you have a logger
    }
  }

  return updated;
}

/**
 * Delete a report
 */
async function deleteReport(reportId) {
  await validateObjectId(reportId, "reportId");

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const report = await ReportModel.findByIdAndDelete(reportId, { session });
    if (!report) {
      await session.abortTransaction();
      throw new Error("Report not found");
    }
    // Optionally clear interview.overallScore if this was the only report
    // You can add logic here to recompute interview overall score from remaining reports or answers

    await session.commitTransaction();
    return { success: true };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

/**
 * Optional: Export a report to PDF (stub)
 * If you want a real PDF, install pdfkit or similar and implement here.
 *
 * Example (pseudo):
 *   import PDFDocument from "pdfkit";
 *   const doc = new PDFDocument();
 *   doc.text("Report ...");
 *   doc.pipe(fs.createWriteStream(path));
 *   doc.end();
 *
 * For now this returns a JSON summary for clients to render/download.
 */
async function exportReportSummary(reportId) {
  const report = await getReportById(reportId);
  if (!report) throw new Error("Report not found");

  // Build a simple summary object (clients can render this)
  const answers = await AnswerModel.find({ interview: report.interview }).lean();

  return {
    report,
    answersCount: answers.length,
    generatedAt: new Date()
  };
}

export default {
  createReport,
  generateReportFromInterview,
  getReportById,
  listReports,
  updateReport,
  deleteReport,
  exportReportSummary
};
