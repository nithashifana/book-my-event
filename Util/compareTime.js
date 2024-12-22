module.exports = (now, time) => {
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    return 60*hours + minutes
  }

  const timeMinutes = convertToMinutes(time);
  const nowMinutes = convertToMinutes(now);

  if (nowMinutes < timeMinutes) {
    return 1;
  } else {
    return 0;
  }
};