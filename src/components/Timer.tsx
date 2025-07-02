import { useRef, useState } from "react";
import { Button } from "./ui/button";

export default function Timer() {
  const [duration, setDuration] = useState(3600000);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(3600000);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(setInterval(() => {}, 1000));

  const runTimer = (end: number) => {
    intervalRef.current = setInterval(() => {
      const timeleft = end - Date.now();
      if (timeleft <= 0) {
        resetTimer();
        return;
      }
      setRemainingTime(timeleft);
    }, 100);
  };

  const startTimer = () => {
    setIsRunning(true);
    clearInterval(intervalRef.current);
    const now = Date.now();
    const end = now + duration;
    setStartTime(now);
    setEndTime(end);
    setRemainingTime(end - now);
    runTimer(end);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setStartTime(0);
    setEndTime(0);
    setDuration(3600000);
    setRemainingTime(3600000);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const increaseTime = () => {
    if (!isRunning) {
      const updated = duration + 60000;
      setDuration(updated);
      setRemainingTime(updated);
    }
  };

  const decreaseTime = () => {
    if (!isRunning && duration >= 60000) {
      const updated = duration - 60000;
      setDuration(updated);
      setRemainingTime(updated);
    }
  };


  return (
     <div className="flex flex-col items-center gap-6 p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-md max-w-sm w-full text-center">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">Timer</h1>

      <div className="flex gap-4">
        <Button variant="outline" onClick={increaseTime} disabled={isRunning}>+1 min</Button>
        <Button variant="outline" onClick={decreaseTime} disabled={isRunning}>-1 min</Button>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Remaining Time</span>
        <h2 className="text-5xl font-mono tracking-wide mt-1 text-zinc-800 dark:text-white">
          {formatTime(remainingTime)}
        </h2>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={startTimer} disabled={isRunning}>
          Start
        </Button>
        <Button variant="outline" onClick={resetTimer}>Reset</Button>
      </div>
    </div>
  );
}
