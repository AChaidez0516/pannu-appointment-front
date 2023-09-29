import moment from "moment";

const TIME_FORMAT = "HH:mm"
const DATE_FORMAT = "YYYY-MM-DD"
const DATE_DAY_FORMAT = "dddd MM/DD, YYYY"

const convertMomentFromStr = (str) => moment(`${moment().format('YYYY-MM-DD')} ${str}:00`, "YYYY-MM-DD HH:mm:ss")

export const isWhatColor = (planStr, actualStr) => {
  if (!actualStr) return ""
  if (typeof planStr === 'number' && typeof actualStr === 'number') return planStr === actualStr ?
    '#000000' : planStr > actualStr ? '#29B05A' : '#FF0000'
  const plan = convertMomentFromStr(planStr)
  const actual = convertMomentFromStr(actualStr)
  return actual.isSame(plan) ? '#000000' :
    actual.isBefore(plan) ? '#29B05A' : '#FF0000'
}

export const calcDuration = (startStr, endStr) => {
  if (!startStr || !endStr) return ''
  const start = convertMomentFromStr(startStr)
  const end = convertMomentFromStr(endStr)
  return end.diff(start, 'minutes')
}

/** time and date padding func */
export const padZero = (num) => num < 10 ? `0${num}` : `${num}`

export const getTimeFromApt = (aptDate, aptTime) => {
  return moment(`${aptDate} ${aptTime}`).format(TIME_FORMAT)
}

export const isCurrentApt = (aptTime, duration) => {
  let _duration = duration
  if (!_duration) _duration = 0
  const now = moment()
  const s = convertMomentFromStr(aptTime);
  const e = s.clone()
  e.add(duration, 'minutes')

  return now.isBetween(s, e)
}

export const isExpiredApt = (aptDate, aptTime) => {
  const now = moment().format('YYYY-MM-DD HH:mm:ss')
  const aptDateTime = moment(`${aptDate} ${aptTime}`, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')
  return aptDateTime < now
}