let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");
const originalText = document.getElementById("originalText");
const translatedText = document.getElementById("translatedText");

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      await sendAudioForTranslation(audioBlob);
    };

    mediaRecorder.start();

    startBtn.disabled = true;
    stopBtn.disabled = false;
    statusText.textContent = "Recording... speak now.";
  } catch (error) {
    statusText.textContent = "Microphone permission denied or unavailable.";
    console.error(error);
  }
});

stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusText.textContent = "Processing translation...";
});

async function sendAudioForTranslation(audioBlob) {
  const formData = new FormData();

  formData.append("audio", audioBlob, "voice.webm");
  formData.append("sourceLanguage", document.getElementById("sourceLanguage").value);
  formData.append("targetLanguage", document.getElementById("targetLanguage").value);

  try {
    const response = await fetch("/api/translate-audio", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    originalText.textContent = data.originalText || "No speech detected.";
    translatedText.textContent = data.translatedText || "No translation returned.";
    statusText.textContent = "Translation complete.";
  } catch (error) {
    console.error(error);
    statusText.textContent = "Error: translation failed.";
  }
}
