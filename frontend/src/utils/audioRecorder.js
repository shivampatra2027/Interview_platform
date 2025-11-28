// frontend/src/utils/audioRecorder.js
// Provides startRecorder(onStop) which returns a stop() function.
// onStop receives one argument: the base64 string (no data: prefix).

export function startRecorder(onStop) {
  if (typeof onStop !== "function") {
    throw new Error("startRecorder expects a callback function onStop(base64)");
  }

  let mediaRecorder = null;
  let stopped = false;
  let chunks = [];
  let streamRef = null;

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef = stream;
      chunks = [];

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) chunks.push(ev.data);
      };

      mediaRecorder.onstop = async () => {
        try {
          const blob = new Blob(chunks, { type: "audio/webm" });
          const base64 = await blobToBase64(blob);
          // base64 is like "data:audio/webm;base64,AAAA..."
          const pure = base64.split(",")[1];
          onStop(pure);
        } catch (err) {
          console.error("Recorder onstop error:", err);
        } finally {
          // stop tracks
          if (streamRef) {
            streamRef.getTracks().forEach((t) => t.stop());
            streamRef = null;
          }
        }
      };

      mediaRecorder.start();
      return true;
    } catch (err) {
      console.error("startRecorder error:", err);
      throw err;
    }
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    try {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      } else {
        // ensure tracks stop even if recorder not active
        if (streamRef) streamRef.getTracks().forEach((t) => t.stop());
      }
    } catch (err) {
      console.warn("stop recorder error:", err);
    }
  };

  // start immediately, return the stop function
  start().catch((e) => {
    // bubble up if needed - also call onStop with null to indicate failure
    console.error("Failed to start recorder:", e);
    try { onStop(null, e); } catch (_) {}
  });

  return stop;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default startRecorder;
