import {useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode,replace){
    setMode(newMode)
    if (replace) {
      setHistory(prev => {
        const prevCopy = [...prev]
        prevCopy.pop()
        return [...prevCopy, newMode]
      })
    } else {
      setHistory(prev => {
        const prevCopy = [...prev]
        return [...prevCopy, newMode]
        }
      )
    }
  };

  const back = () => {
    const historyCopy = [...history];
    if (historyCopy.length > 1){
      historyCopy.pop();
      setHistory(historyCopy)
      console.log('set to', historyCopy[historyCopy.length - 1])
      setMode(historyCopy[historyCopy.length - 1])
    }
  }
  return {mode, transition, back}
};