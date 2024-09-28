import { useEffect, useState } from "react";

export const useCurrentTimeAndDate = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setDate(new Intl.DateTimeFormat('en-CA', { dateStyle: 'full' }).format(now));
      };

      updateTime(); // Initial call to set the time/date right away
      const intervalId = setInterval(updateTime, 1000); // Update every second

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);

    return { time, date };
  };
