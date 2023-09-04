export function MessageSender(callback) {
  const targetTime = new Date(); // Target time in UTC
  targetTime.setUTCHours(14, 0, 0, 0); // Set target time to 9:24 AM

  const now = new Date(); // Current time in UTC

  // Check if the current time is after the target time for today
  if (
    now.getUTCHours() > targetTime.getUTCHours() ||
    (now.getUTCHours() === targetTime.getUTCHours() &&
      now.getUTCMinutes() >= targetTime.getUTCMinutes())
  ) {
    // If it's after the target time, add one day to the target time
    targetTime.setUTCDate(targetTime.getUTCDate() + 1);
  }

  // Calculate the time difference between the current time and the target time
  let timeDifference = targetTime - now;

  // Set a timeout to execute the callback function at the specified time
  setTimeout(() => {
    // Call your function here
    callback();
    console.log("Function executed!");

    // Schedule the next execution for the same time tomorrow
    MessageSender(callback);
  }, timeDifference);
}
