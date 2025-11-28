import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";

import { playBase64 } from "../utils/audio";
import { startRecorder } from "../utils/audioRecorder";
import useInterviewSocket from "../hooks/useInterviewSocket";

export default function InterviewPage() {
  const navigate = useNavigate();

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [stopRecorder, setStopRecorder] = useState(null);

  // Media toggles
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Timer
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Dynamic AI data
  const [interviewId, setInterviewId] = useState("123456TEST"); // TEMP: Replace with real interviewId later
  const [currentQuestion, setCurrentQuestion] = useState(
    "Tell me about yourself and your background."
  );
  const [feedback, setFeedback] = useState([]);

  // TIMER
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
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  //-------------------------------------------------------
  // SOCKET SETUP
  //-------------------------------------------------------
  const { sendAudio } = useInterviewSocket(
    interviewId,
    (data) => {
      console.log("AI RESPONSE:", data);

      if (data.audioBase64) playBase64(data.audioBase64, "audio/wav");

      if (data.question) setCurrentQuestion(data.question);

      if (data.feedback) setFeedback(data.feedback);
    }
  );

  //-------------------------------------------------------
  // RECORDING LOGIC
  //-------------------------------------------------------
  const handleStartRecording = () => {
    setIsRecording(true);

    const stopFn = startRecorder((audioBase64) => {
      console.log("Sending audio to backend...");
      sendAudio(audioBase64);
      console.log("Audio sent.");
    });

    setStopRecorder(() => stopFn);
  };

  const handleStopRecording = () => {
    if (stopRecorder) stopRecorder();
    setIsRecording(false);
  };

  //-------------------------------------------------------
  // END INTERVIEW
  //-------------------------------------------------------
  const handleEndInterview = () => {
    if (window.confirm("Are you sure you want to end the interview?")) {
      navigate("/reports");
    }
  };

  //-------------------------------------------------------
  // UI
  //-------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* HEADER */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* red dot */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-white font-medium">Interview in Progress</span>
            </div>

            {/* timer */}
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          <button
            onClick={handleEndInterview}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Phone className="w-4 h-4" />
            End Interview
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex">
        {/* VIDEO SECTION */}
        <div className="flex-1 p-6">
          <div className="h-full flex flex-col gap-4">
            {/* AI Interviewer */}
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-slate-400">AI Interviewer</p>
                </div>
              </div>
            </div>

            {/* User camera */}
            <div className="h-48 bg-slate-900 border border-slate-800 rounded-xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {videoEnabled ? (
                  <div className="text-center">
                    <Video className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-slate-500">Your Camera</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-slate-500">Camera Off</p>
                  </div>
                )}
              </div>

              {/* controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className={`w-10 h-10 rounded-full flex justify-center items-center ${
                    audioEnabled ? "bg-slate-800" : "bg-red-600"
                  }`}
                >
                  {audioEnabled ? <Mic /> : <MicOff />}
                </button>

                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`w-10 h-10 rounded-full flex justify-center items-center ${
                    videoEnabled ? "bg-slate-800" : "bg-red-600"
                  }`}
                >
                  {videoEnabled ? <Video /> : <VideoOff />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
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
              {feedback.map((f, i) => (
                <div
                  key={i}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* START/STOP RECORDING */}
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mt-6"
            >
              <Mic className="w-5 h-5" />
              Start Recording Answer
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mt-6"
            >
              <MicOff className="w-5 h-5" />
              Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
