import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Clock,
  Target,
  Award,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw // Added for retry button
} from 'lucide-react';
import { reportsAPI } from '../api';
import { useAPI } from '../hooks/useAPI';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { callAPI, loading } = useAPI();
  const [reports, setReports] = useState(null); // Changed to null for initial loading distinction
  const [error, setError] = useState(null); // Added error state
  const [retryCount, setRetryCount] = useState(0); // For retry mechanism

  // Memoized fetch function to avoid recreating on every render
  const fetchReports = useCallback(async () => {
    if (loading) return; // Prevent multiple concurrent calls
    setError(null);
    try {
      const response = await callAPI(reportsAPI.listUserReports);
      if (response?.data?.reports) {
        setReports(response.data.reports);
      } else {
        // Fallback to empty array if no reports
        setReports([]);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please ensure your backend is running on port 5002.');
      } else {
        setError(`Failed to fetch reports: ${err.message}`);
      }
      // Optional: Auto-retry up to 3 times with delay
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000 * (retryCount + 1)); // Exponential backoff: 2s, 4s, 6s
      }
    }
  }, [callAPI, loading, retryCount]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // If reports is null and no error, show loading (initial state)
  // If error, show error UI
  // Otherwise, use reports or fallback to hardcoded data
  if (loading && !reports) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error && !reports) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load Reports</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={fetchReports}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4 animate-spin" />
            Retry
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="ml-4 text-slate-400 hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Process reports data - assuming structure like:
  // reports = [{ overallScore, metrics: [...], strengths: [...], improvements: [...], sessions: [...] }, ...]
  // Adjust based on your actual API response. For now, using the latest report or fallback to hardcoded.
  const latestReport = reports?.length > 0 ? reports[reports.length - 1] : null;
  const overallScore = latestReport?.overallScore || 85;
  const metrics = latestReport?.metrics || [
    { label: 'Technical Skills', score: 88, change: 5, trend: 'up' },
    { label: 'Communication', score: 82, change: -2, trend: 'down' },
    { label: 'Problem Solving', score: 90, change: 8, trend: 'up' },
    { label: 'Confidence', score: 78, change: 3, trend: 'up' }
  ];
  const strengths = latestReport?.strengths || [
    'Excellent use of STAR method',
    'Clear and concise explanations',
    'Strong technical knowledge'
  ];
  const improvements = latestReport?.improvements || [
    'Reduce filler words (um, uh)',
    'Maintain better eye contact',
    'Provide more specific examples'
  ];
  const sessions = latestReport?.sessions || [
    { date: '2024-11-20', role: 'Software Engineer', score: 85, duration: '45 min' },
    { date: '2024-11-18', role: 'Product Manager', score: 78, duration: '38 min' },
    { date: '2024-11-15', role: 'Data Scientist', score: 92, duration: '52 min' }
  ];

  // If error but reports loaded previously, show UI with warning banner
  const showErrorBanner = error && reports;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Performance Reports</h1>
                <p className="text-slate-400 mt-1">Track your interview progress and improvements</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Banner if partial load */}
        {showErrorBanner && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-300 font-medium">{error}</p>
              <button 
                onClick={fetchReports}
                className="text-blue-400 hover:text-blue-300 text-sm mt-1"
              >
                Retry Fetch
              </button>
            </div>
          </div>
        )}

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-blue-100">Overall Score</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">{overallScore}</span>
                <span className="text-2xl text-blue-100">/100</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-sm text-blue-100">+5 points from last session</span>
              </div>
            </div>
            <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center">
              <BarChart3 className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">{metric.label}</h3>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">{metric.score}</span>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    metric.score >= 85 ? 'bg-green-500' : 
                    metric.score >= 70 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Strengths</h2>
            </div>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Areas for Improvement</h2>
            </div>
            <div className="space-y-3">
              {improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Session History */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Session History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-slate-400 font-medium py-3 px-4">Date</th>
                  <th className="text-left text-slate-400 font-medium py-3 px-4">Role</th>
                  <th className="text-left text-slate-400 font-medium py-3 px-4">Duration</th>
                  <th className="text-left text-slate-400 font-medium py-3 px-4">Score</th>
                  <th className="text-right text-slate-400 font-medium py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4 text-slate-300">{session.date}</td>
                    <td className="py-4 px-4 text-white font-medium">{session.role}</td>
                    <td className="py-4 px-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        {session.duration}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold ${
                          session.score >= 85 ? 'text-green-400' : 
                          session.score >= 70 ? 'text-yellow-400' : 
                          'text-red-400'
                        }`}>
                          {session.score}%
                        </span>
                        <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              session.score >= 85 ? 'bg-green-500' : 
                              session.score >= 70 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${session.score}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Reports Message if empty */}
        {reports && reports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No reports available yet. Complete your first session to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}