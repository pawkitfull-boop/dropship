"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // 8 hours in milliseconds
    const DURATION = 8 * 60 * 60 * 1000;

    const getTargetTime = () => {
      const stored = localStorage.getItem("flash_sale_end");
      if (stored) {
        const time = parseInt(stored, 10);
        if (time > Date.now()) {
          return time;
        }
      }
      // Set new target time
      const newTarget = Date.now() + DURATION;
      localStorage.setItem("flash_sale_end", newTarget.toString());
      return newTarget;
    };

    let targetTime = getTargetTime();

    const calculateTimeLeft = () => {
      let diff = targetTime - Date.now();
      if (diff <= 0) {
        // Reset timer
        targetTime = Date.now() + DURATION;
        localStorage.setItem("flash_sale_end", targetTime.toString());
        diff = DURATION;
      }

      return {
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    // Initial calculation (wrapped in timeout to avoid sync setState in effect warning)
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return null; // Return empty until hydration to avoid layout shift mismatches
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg border border-gray-800 mb-6"
    >
      <div className="flex items-center gap-2 mb-3 sm:mb-0">
        <span className="text-xl">⚡</span>
        <span className="font-bold tracking-wide text-sm sm:text-base">FLASH SALE ENDS IN</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black tabular-nums leading-none">{formatNumber(timeLeft.hours)}</span>
          <span className="text-[10px] font-bold tracking-wider text-gray-400 mt-1">HRS</span>
        </div>
        
        <span className="text-gray-500 font-bold text-xl mb-3">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black tabular-nums leading-none">{formatNumber(timeLeft.minutes)}</span>
          <span className="text-[10px] font-bold tracking-wider text-gray-400 mt-1">MIN</span>
        </div>

        <span className="text-gray-500 font-bold text-xl mb-3">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black tabular-nums leading-none">{formatNumber(timeLeft.seconds)}</span>
          <span className="text-[10px] font-bold tracking-wider text-gray-400 mt-1">SEC</span>
        </div>
      </div>
    </motion.div>
  );
}
