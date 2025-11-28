// frontend/src/utils/audio.js
export function playBase64(audioBase64, mime = "audio/wav") {
  try {
    const audio = new Audio(`data:${mime};base64,${audioBase64}`);
    // play returns a promise; catch in case autoplay blocked
    audio.play().catch((e) => {
      // ignore autoplay errors (user gesture required)
      // console.warn("audio play failed:", e);
    });
    return audio;
  } catch (err) {
    console.error("playBase64 error:", err);
    return null;
  }
}
export default playBase64;
