import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert("Time's up! Take a break.");
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const handleStartStop = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight">Pomodoro Timer</h1>

      <div className="w-64 h-64 flex items-center justify-center rounded-full shadow-inner bg-gray-50 mb-8">
        <span className="text-5xl font-mono text-gray-700">{formatTime(timeLeft)}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStartStop}
          className="px-6 py-3 rounded-full bg-green-500 text-white font-medium shadow hover:bg-green-600 transition-colors"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
