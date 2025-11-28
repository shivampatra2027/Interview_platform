// frontend/src/hooks/useInterviewSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

export default function useInterviewSocket(interviewId, onAiResponse) {
  const socketRef = useRef(null);
  const { getToken } = useAuth();  // ✅ Correct way to access token

  useEffect(() => {
    if (!interviewId) return;

    let mounted = true;
    let socket = null;

    (async () => {
      try {
        // Clerk token (if logged in)
        let token = null;
        try {
          token = await getToken();  // 🎉 Now correct
        } catch (err) {
          token = localStorage.getItem("token");
        }

        const backendUrl = (
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5002"
        ).replace(/\/$/, "");

        socket = io(backendUrl, {
          transports: ["websocket"],
          auth: { token },
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          socket.emit("join_room", { roomId: interviewId });
        });

        socket.on("ai_response", (payload) => {
          if (!mounted) return;
          onAiResponse?.(payload);
        });

        socket.on("ai_audio_chunk", (payload) => {
          if (!mounted) return;
          onAiResponse?.(payload);
        });

        socket.on("error_message", (err) => {
          console.error("Socket error:", err);
        });

      } catch (err) {
        console.error("Socket setup failed:", err);
      }
    })();

    return () => {
      mounted = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [interviewId, getToken, onAiResponse]);

  const sendAudio = (audioBase64, ext = "webm") => {
    socketRef.current?.emit("user_audio_chunk", {
      interviewId,
      audioChunk: audioBase64,
      audioExt: ext,
    });
  };

  const endInterview = () => {
    socketRef.current?.emit("end_interview", { interviewId });
  };

  return { sendAudio, endInterview, socket: socketRef.current };
}
