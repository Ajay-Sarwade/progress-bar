import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (progress < 100) {
      timer.current = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100);
    } else {
      clearInterval(timer.current); // Clear the interval correctly
      timer.current = null;
    }

    return () => {
      clearInterval(timer.current); // Cleanup interval on component unmount
    };
  }, [progress]); // Include progress in the dependency array

  function handleStart() {
    if (timer.current == null && progress < 100) {
      timer.current = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100);
    }
  }

  function handleStop() {
    clearInterval(timer.current);
    timer.current = null;
  }

  return (
    <div className="App">
      <h1>Progress Bar : {progress}%</h1>
      <div className="progress-container">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {/* progress bar control using start stop  */}
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </div>
  );
}

export default App;
