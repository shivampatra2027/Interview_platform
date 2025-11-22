import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone,
  MessageSquare,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function InterviewPage() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentQuestion] = useState(
    "Tell me about yourself and your background."
  );
  const [feedback] = useState([
    "Good eye contact maintained",
    "Consider slowing down your pace slightly"
  ]);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end the interview?')) {
      navigate('/reports');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual recording logic
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-medium">Interview in Progress</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <button
            onClick={handleEndInterview}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4" />
            End Interview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Section */}
        <div className="flex-1 p-6">
          <div className="h-full flex flex-col gap-4">
            {/* AI Interviewer */}
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-slate-400">AI Interviewer</p>
                </div>
              </div>
            </div>

            {/* Your Video */}
            <div className="h-48 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {videoEnabled ? (
                  <div className="text-center">
                    <Video className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Your Camera</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Camera Off</p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    audioEnabled 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    videoEnabled 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-slate-900 border-l border-slate-800 p-6 flex flex-col">
          {/* Current Question */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Current Question</h3>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-300">{currentQuestion}</p>
            </div>
          </div>

          {/* Real-time Feedback */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-semibold">Real-time Feedback</h3>
            </div>
            <div className="space-y-2">
              {feedback.map((item, index) => (
                <div 
                  key={index}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-3">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Clarity</span>
                  <span className="text-white font-medium">85%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Confidence</span>
                  <span className="text-white font-medium">78%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Pace</span>
                  <span className="text-white font-medium">92%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Start Recording Button */}
          {!isRecording && (
            <button
              onClick={handleStartRecording}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <Mic className="w-5 h-5" />
              Start Recording Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
