import React, {useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode,replace){
    setMode(newMode)
    if (replace) {
      setHistory(prev => {
        const prevCopy = prev
        const popped = prevCopy.pop()
        // console.log('this is prev copy',prevCopy)
        return [...prev, newMode]
      })
    } else {
      setHistory(prev => [...prev, newMode])
    }
    // console.log("here's history", history)
  };

  const back = () => {
    const historyCopy = history;
    if (historyCopy.length > 1){
      const poppedVal = historyCopy.pop();
      setHistory(historyCopy)
    }
    setMode(historyCopy[historyCopy.length - 1])
  }
  return {mode, transition, back}
};