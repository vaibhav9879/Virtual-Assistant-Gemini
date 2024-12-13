import React, { useContext } from "react";
import "./App.css";
import assistantImg from "./assets/ai.png";
import speakImg from "./assets/speak.gif";
import aiImg from "./assets/aiVoice.gif";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./context/userContext";

function App() {
  const {
    recognition,
    speaking,
    setSpeaking,
    promptText,
    setPrompText,
    aiResp,
    setAiResp,
  } = useContext(dataContext);

  return (
    <div className="main">
      <img src={assistantImg} alt="" id="saraImg" />
      <span>I'm Sara, Your Advanced Virtual Assistant</span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompText("listening...");
            setSpeaking(true);
            setAiResp(false);
            recognition.start();
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="respDiv">
          {!aiResp ? (
            <img src={speakImg} alt="" id="speakImg" />
          ) : (
            <img src={aiImg} alt="" id="aiImg" />
          )}
          <p>{promptText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
