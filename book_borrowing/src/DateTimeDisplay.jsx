import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Format Date: "Month Day, Year"
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      {formattedDate} | {dateTime.toLocaleTimeString()}
    </div>
  );
};

export default DateTimeDisplay;
