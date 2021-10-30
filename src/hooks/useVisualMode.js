import React, {useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode){
    setMode(newMode)
    const modeCopy = mode
    setHistory(prev => [...prev, modeCopy])
  };

  const back = () => {
    const historyCopy = history;
    const poppedVal = historyCopy.pop();
    setHistory(historyCopy)
    setMode(poppedVal)
  }
  return {mode, transition, back}
};