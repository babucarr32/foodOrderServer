export function MessageSender(callback) {
  const now = new Date(); // Current time in UTC
  const targetTime = new Date(); // Target time in UTC
  targetTime.setUTCHours(13, 30, 0, 0); // Set target time to 9:05 AM

  // Check if the current day is Sunday (0 is Sunday, 1 is Monday, and so on)
  if (now.getUTCDay() !== 0) {
    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
      setTimeout(() => {
        // Call your function here
        callback();
        console.log("Function executed!");
        // Reschedule for the next day
        MessageSender(callback);
      }, timeDifference);
    }
    // No need to reschedule if the time has already passed for the day
  } else {
    // If it's Sunday, reschedule for the next day (Monday)
    const nextDay = new Date(now);
    nextDay.setUTCDate(now.getUTCDate() + 1);
    nextDay.setUTCHours(0, 0, 0, 0);
    const timeDifference = nextDay - now;

    setTimeout(() => {
      MessageSender(callback);
    }, timeDifference);
  }
}
