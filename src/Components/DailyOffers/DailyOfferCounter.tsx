import React, { useEffect, useState } from "react";

const DailyOffersCounter: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    const difference = tomorrow.getTime() - now.getTime();

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="Counter"
      className="text-xl text-gray-600 mt-2 font-bold hidden md:block"
    >
      {`${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes
        .toString()
        .padStart(2, "0")}:${timeLeft.seconds.toString().padStart(2, "0")}`}
    </div>
  );
};

export default DailyOffersCounter;
