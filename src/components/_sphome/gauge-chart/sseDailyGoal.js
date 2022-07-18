import { useState, useEffect } from "react";

class sseDataService {

  useEventDailyGoal(url) {
    const [dailyGoal, setDailyGoal] = useState(null);
  
    useEffect(() => {
      let isMounted = true;

      let sseDailyGoal = new EventSource(url);
      let count = Math.floor(Math.random() * (2000 - 25) + 25);
      sseDailyGoal.onmessage = function logEvents(event) {
        if (isMounted) setDailyGoal(count);
      };
      sseDailyGoal.onerror = () => {
        sseDailyGoal.close();
      }
      return () => {
        isMounted = false;
        sseDailyGoal.close();
      };
    }, [url]);

    if (!dailyGoal) return 0;
  
    return dailyGoal;
  };
};

export default new sseDataService();
