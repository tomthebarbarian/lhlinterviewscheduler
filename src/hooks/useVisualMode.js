import {useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  // Function transition sets the mode state to 
  // a new mode
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

  // Function back removes the rightmost item
  // from history if length is greater than 1 and 
  // then sets the mode to the rightmost state.
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