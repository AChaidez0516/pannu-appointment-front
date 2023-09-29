import moment from 'moment'

export const DAY_WIDTH = 120;    // px - width of each day column
export const STEP_HEIGHT = 120;  // px - height of each timeslot row

// Create timeslot string from mins e.g. 160 min => 2:40 AM
export const getTimeslotString = (time) => {
  if (time == 0)
    return '12 AM';
  if (time == 1440)
    return '12 AM';
  let hour = parseInt(time / 60);
  let min = time % 60;
  let minStr = min ? ':' + (min < 10 ? '0' + min: min) : '';
  if (hour < 12) {
    return `${hour}${minStr} AM`;
  } else if (hour == 12) {
    return `${hour}${minStr} PM`;
  } else {
    return `${hour - 12}${minStr} PM`;
  }
}
