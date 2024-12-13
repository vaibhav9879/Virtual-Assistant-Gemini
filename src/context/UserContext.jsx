import React, { createContext, useState } from "react";
import run from "../../gemini";

export const dataContext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [promptText, setPrompText] = useState("listening...");
  const [aiResp, setAiResp] = useState(false);

  function speak(text) {
    if (!text || typeof text !== "string") {
      console.error("Invalid text for speech synthesis:", text);
      return;
    }

    const textToSpeak = new SpeechSynthesisUtterance(text);
    textToSpeak.volume = 1;
    textToSpeak.rate = 1;
    textToSpeak.pitch = 1;
    textToSpeak.lang = "hi-In";

    const voices = window.speechSynthesis.getVoices();
    textToSpeak.voice =
      voices.find((voice) => voice.lang === "hi-In") || voices[0];

    console.log("Available voices:", voices);
    console.log("Speaking text:", text);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      window.speechSynthesis.speak(textToSpeak);
    } else {
      console.error("Speech Synthesis not supported in this browser.");
    }
  }

  async function aiResponse(prompt) {
    try {
      const responseText = await run(prompt); // Pass prompt to `run`
      let newText =
        responseText.split("**") &&
        responseText.split("*") &&
        responseText.replace("google", "Vaibhav Mhasange") &&
        responseText.replace("Google", "Vaibhav Mhasange");
      speak(newText);
      setPrompText(newText);
      setAiResp(true);

      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } catch (error) {
      console.error("Error in AI response:", error);
    }
  }

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new speechRecognition();
  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    setPrompText(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Wait Opening Youtube");
      setAiResp(true);
      setPrompText("wait opening youtube...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.google.com/", "_blank");
      speak("Wait Opening Google");
      setAiResp(true);
      setPrompText("wait opening google...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Wait Opening Instagram");
      setAiResp(true);
      setPrompText("wait opening instagram...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setAiResp(true);
      setPrompText(time);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setAiResp(true);
      setPrompText(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  const value = {
    recognition,
    speaking,
    setSpeaking,
    promptText,
    setPrompText,
    aiResp,
    setAiResp,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
