"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  minutes: number;
}

const Countdown: React.FC<CountdownProps> = ({ minutes }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }
        return prevSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
  const secondsLeft = remainingSeconds % 60;

  return (
    <div>
      <span>{hours < 10 ? "0" + hours : hours}</span>:
      <span>{minutesLeft < 10 ? "0" + minutesLeft : minutesLeft}</span>:
      <span>{secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}</span>
    </div>
  );
};

export default Countdown;
