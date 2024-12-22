module.exports = (now, startingTime, endingTime) => {
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    return 60*hours + minutes
  }

  const startingTimeMinutes = convertToMinutes(startingTime);
  const endingTimeMinutes = convertToMinutes(endingTime);
  const nowMinutes = convertToMinutes(now);

  if (nowMinutes >= startingTimeMinutes && nowMinutes <= endingTimeMinutes ) {
    return 1;
  } else {
    return 0;
  }
};