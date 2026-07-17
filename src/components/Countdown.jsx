'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num) => String(num).padStart(2, '0');

  return (
    <div id="countdown" className="mt-8 mb-16">
      <div className="countdown-inner font-serif-elegant text-[#928362] text-4xl md:text-5xl font-light tracking-[0.2em] flex items-center justify-center space-x-3 select-none">
        <span className="w-20 text-center">{padZero(timeLeft.days)}</span>
        <span className="opacity-70 -mt-1">:</span>
        <span className="w-14 text-center">{padZero(timeLeft.hours)}</span>
        <span className="opacity-70 -mt-1">:</span>
        <span className="w-14 text-center">{padZero(timeLeft.minutes)}</span>
        <span className="opacity-70 -mt-1">:</span>
        <span className="w-14 text-center">{padZero(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}
