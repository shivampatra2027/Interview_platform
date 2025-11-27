//interview.serv..
//this need to be completed
// src/services/interview.service.js
import mongoose from "mongoose";
import InterviewModel from "../models/interviewSession.model.js";
import QuestionModel from "../models/question.model.js";
import AnswerModel from "../models/answer.model.js";
import ReportModel from "../models/report.model.js";

import {
  generateInitialQuestion,
  evaluateInterviewAnswers,
  generateFinalReport
} from "./ai.service.js";

/**
 * Interview service
 * Responsibilities:
 * - CRUD for InterviewModel
 * - Start interview (seed initial question via ai.service)
 * - Accept user audio (delegate to ai.service)
 * - Finish interview (generate final report)
 *
 * Note: controllers should perform auth checks and pass the authenticated userId if needed.
 */

async function createInterview({ title = "Interview", userId = null, role = "General", difficulty = "medium", metadata = {} } = {}) {
  const doc = await InterviewModel.create({
    title,
    user: userId,
    role,
    difficulty,
    metadata,
    createdAt: new Date()
  });
  return doc.toObject();
}

async function getInterviewById(interviewId) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  const interview = await InterviewModel.findById(interviewId).lean();
  if (!interview) throw new Error("Interview not found");
  return interview;
}

async function updateInterview(interviewId, update = {}) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  const allowed = ["title", "role", "difficulty", "metadata", "status"];
  const payload = {};
  for (const k of allowed) if (k in update) payload[k] = update[k];
  if (Object.keys(payload).length === 0) throw new Error("No updatable fields provided");
  const updated = await InterviewModel.findByIdAndUpdate(interviewId, { $set: payload }, { new: true }).lean();
  if (!updated) throw new Error("Interview not found");
  return updated;
}

async function deleteInterview(interviewId) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  // consider cascade delete: questions, answers, reports
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const interview = await InterviewModel.findByIdAndDelete(interviewId, { session });
    if (!interview) {
      await session.abortTransaction();
      throw new Error("Interview not found");
    }
    await QuestionModel.deleteMany({ interview: interviewId }, { session });
    await AnswerModel.deleteMany({ interview: interviewId }, { session });
    await ReportModel.deleteMany({ interview: interviewId }, { session });
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
 * Start an interview:
 * - Updates interview metadata (optional)
 * - Calls ai.service.generateInitialQuestion to create initial question & TTS audio
 * - Saves initial question already happens in generateInitialQuestion (ai.service)
 * Returns the interview and initial question/audio object.
 */
async function startInterview({ interviewId, role = null, difficulty = null } = {}) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  const interview = await InterviewModel.findById(interviewId);
  if (!interview) throw new Error("Interview not found");

  // update interview fields if provided
  const update = {};
  if (role) update.role = role;
  if (difficulty) update.difficulty = difficulty;
  if (Object.keys(update).length) {
    Object.assign(interview, update);
    await interview.save();
  }

  // Generate initial question via ai.service
  const { questionId, questionText, aiAudioBase64 } = await generateInitialQuestion({
    interviewId,
    role: interview.role,
    difficulty: interview.difficulty
  });

  // mark interview as started
  interview.startedAt = interview.startedAt || new Date();
  interview.status = "in_progress";
  await interview.save();

  return {
    interview: interview.toObject(),
    initialQuestion: { questionId, questionText, aiAudioBase64 }
  };
}

/**
 * Accept user audio for evaluation:
 * - Delegates to ai.service.evaluateInterviewAnswers (which internally saves Answer & Question)
 * - Updates interview metadata (lastActivityAt, overallScore maybe)
 * - Returns the ai.service response (transcript, feedback, audio)
 */
async function handleUserAudio({ interviewId, audioBase64, audioExt = "webm" } = {}) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  if (!audioBase64) throw new Error("audioBase64 required");

  // ensure interview exists
  const interview = await InterviewModel.findById(interviewId);
  if (!interview) throw new Error("Interview not found");

  // Delegate heavy work to ai.service
  const result = await evaluateInterviewAnswers({ interviewId, audioBase64, audioExt });

  // Update interview lastActivity and maybe overall score
  interview.lastActivityAt = new Date();
  if (typeof result.overallScore === "number") {
    // a simple running update — the final report will compute a true average
    interview.overallScore = result.overallScore;
  }
  await interview.save();

  return result;
}

/**
 * Finish interview:
 * - Creates final report (delegates to ai.service.generateFinalReport)
 * - Updates interview endedAt/status/overallScore
 * - Returns the report document
 */
async function finishInterview(interviewId) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  const interview = await InterviewModel.findById(interviewId);
  if (!interview) throw new Error("Interview not found");

  const reportDoc = await generateFinalReport(interviewId);

  // update interview
  interview.endedAt = new Date();
  interview.status = "finished";
  interview.overallScore = reportDoc.overallScore ?? interview.overallScore;
  await interview.save();

  return reportDoc;
}

/**
 * Utility: get all interviews with optional pagination/filtering
 */
async function listInterviews({ page = 1, limit = 20, filter = {} } = {}) {
  const skip = (Math.max(1, page) - 1) * limit;
  const q = { ...filter };
  const total = await InterviewModel.countDocuments(q);
  const items = await InterviewModel.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  return { total, page, limit, items };
}

/**
 * Utility: fetch full interview detail with related questions/answers/report
 */
async function getInterviewDetail(interviewId) {
  if (!mongoose.isValidObjectId(interviewId)) throw new Error("Invalid interviewId");
  const interview = await InterviewModel.findById(interviewId).lean();
  if (!interview) throw new Error("Interview not found");

  const [questions, answers, reports] = await Promise.all([
    QuestionModel.find({ interview: interviewId }).sort({ orderIndex: 1 }).lean(),
    AnswerModel.find({ interview: interviewId }).sort({ createdAt: 1 }).lean(),
    ReportModel.find({ interview: interviewId }).sort({ createdAt: -1 }).limit(1).lean()
  ]);

  return {
    interview,
    questions,
    answers,
    report: reports[0] || null
  };
}

export default {
  createInterview,
  getInterviewById,
  updateInterview,
  deleteInterview,
  startInterview,
  handleUserAudio,
  finishInterview,
  listInterviews,
  getInterviewDetail
};
