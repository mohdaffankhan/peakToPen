import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useSound } from "react-sounds";
import { requestNotificationPermission } from "@/lib/notification";

export default function Timer() {
  const [duration, setDuration] = useState(3600000);
  // const [startTime, setStartTime] = useState(0);
  // const [endTime, setEndTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(3600000);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(setInterval(() => {}, 1000));
  const reminderRef = useRef(true);
  useEffect(() => {
    const savedEnd = localStorage.getItem("endTime");
    if (savedEnd) {
      const end = parseInt(savedEnd);
      const now = Date.now();

      if (end > now) {
        setRemainingTime(end - now);
        setIsRunning(true);
        runTimer(end);
      } else {
        localStorage.removeItem("endTime");
      }
    }
  }, []);

  const { play } = useSound("notification/info");
  const runTimer = (end: number) => {
    intervalRef.current = setInterval(() => {
      const timeleft = end - Date.now();
      if (timeleft <= 120000 && reminderRef.current) {
        reminderRef.current = false;
        play();
        new Notification("2mins left! Time to note down!");
      }
      if (timeleft <= 0) {
        play();
        resetTimer();
        new Notification("Time's up!");
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
    localStorage.setItem("endTime", end.toString());
    // setStartTime(now);
    // setEndTime(end);
    setRemainingTime(end - now);
    runTimer(end);
    requestNotificationPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
        new Notification("Notification permission granted");
      }
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    // setStartTime(0);
    // setEndTime(0);
    setDuration(3600000);
    setRemainingTime(3600000);
    reminderRef.current = true;
    localStorage.removeItem("endTime");
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const increaseTime = () => {
    if (!isRunning) {
      const updated = duration + 300000;
      setDuration(updated);
      setRemainingTime(updated);
    }
  };

  const decreaseTime = () => {
    if (!isRunning && duration >= 300000) {
      const updated = duration - 300000;
      setDuration(updated);
      setRemainingTime(updated);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-xl bg-white dark:bg-zinc-900 shadow-md max-w-sm w-full text-center">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
        Timer
      </h1>

      <div className="flex gap-4">
        <Button variant="outline" onClick={increaseTime} disabled={isRunning}>
          +5 min
        </Button>
        <Button variant="outline" onClick={decreaseTime} disabled={isRunning}>
          -5 min
        </Button>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Remaining Time
        </span>
        <h2 className="text-5xl font-mono tracking-wide mt-1 text-zinc-800 dark:text-white">
          {formatTime(remainingTime)}
        </h2>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={startTimer} disabled={isRunning}>
          Start
        </Button>
        <Button variant="outline" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  );
}
