import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const storedEndTime = localStorage.getItem('timerEndTime');
    if (storedEndTime) {
      const remaining = Math.max(0, parseInt(storedEndTime) - Date.now());
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsRunning(true);
      } else {
        localStorage.removeItem('timerEndTime');
      }
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        const storedEndTime = parseInt(localStorage.getItem('timerEndTime'));
        const remaining = Math.max(0, storedEndTime - Date.now());
        
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          setIsRunning(false);
          localStorage.removeItem('timerEndTime');
          clearInterval(interval);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = (seconds) => {
    const ms = seconds * 1000;
    const endTime = Date.now() + ms;
    localStorage.setItem('timerEndTime', endTime);
    setTimeLeft(ms);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    localStorage.removeItem('timerEndTime');
    setTimeLeft(0);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Timer</h2>
      
      <div className="text-6xl font-mono mb-8 font-bold text-slate-700 tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => startTimer(60)} className="bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200">1 Min</button>
        <button onClick={() => startTimer(300)} className="bg-blue-100 text-blue-700 py-2 rounded hover:bg-blue-200">5 Min</button>
        <button onClick={stopTimer} className="bg-red-100 text-red-700 py-2 rounded hover:bg-red-200">Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;