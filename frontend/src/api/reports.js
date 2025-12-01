// frontend/src/api/reports.js
import api from "./axios";
export const reportsAPI = {
  generateReport: async (reportData, token) => {
    const response = await api.post("/reports/generate", reportData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  listUserReports: async (token) => {
    const response = await api.get("/reports", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  getReportById: async (reportId, token) => {
    const response = await api.get(`/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },
  getReportForInterview: async (interviewId, token) => {
    const response = await api.get(`/reports/interview/${interviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};
