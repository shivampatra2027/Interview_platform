// frontend/src/api/interview.js
import { authRequest } from "./index.js";

export async function startInterview({ role = "Backend", difficulty = "medium" }) {
  const res = await authRequest({
    method: "post",
    url: "/interviews/start",
    data: { role, difficulty }
  });
  return res.data;
}

export async function submitAnswer({ interviewId, audioBase64, audioExt = "webm" }) {
  const res = await authRequest({
    method: "post",
    url: `/interviews/${interviewId}/answer`, // adjust to your route
    data: { audioBase64, audioExt }
  });
  return res.data;
}

export async function generateReport(interviewId) {
  const res = await authRequest({
    method: "post",
    url: `/reports/generate/${interviewId}`
  });
  return res.data;
}

export async function getReport(interviewId) {
  const res = await authRequest({
    method: "get",
    url: `/reports/${interviewId}`
  });
  return res.data;
}
