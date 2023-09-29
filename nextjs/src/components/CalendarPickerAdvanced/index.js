import { useEffect, useReducer, useState } from 'react'
import Image from 'next/image'
import { ICONS } from '../../common/utils/styleGuide';
import { IconWrapper } from '../IconWrapper';
import { CustomPopover } from './CustomPopover';
import { CalendarPickerWrapper, PopoverWrapper } from './styled';




const reducer = (state, action) => {
  if (action.type == 'add_week') {
    return { days: [...state.days, action.data] }
  }
  else if (action.type == 'init_days') {
    return { days: [] }
  }
  else {
    return state
  }
}

const weekDays = [
  { id: 0, name: 'Mon' },
  { id: 1, name: 'Tue' },
  { id: 2, name: 'Wed' },
  { id: 3, name: 'Thu' },
  { id: 4, name: 'Fri' },
  { id: 5, name: 'Sat' },
  { id: 6, name: 'Sun' },
]
const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December']


export const CalendarPickerAdvanced = ({ width = 370, value, onSelected, onCancel }) => {


  const [state, dispatch] = useReducer(reducer, { days: [] })
  /** changing-2  */
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)
  /** changing-2  */
  const [tempYear, setTempYear] = useState(0)
  const [tempMonth, setTempMonth] = useState(0)
  /** selected yeat, monthIndex, date, by xu-789 */
  const [originalYear, setOriginalYear] = useState(0)
  const [originalMonth, setOriginalMonth] = useState(0)
  const [originalDay, setOriginalDay] = useState(0)
  const [monthPopupOptions, setMonthPopupOptions] = useState({ opened: false, anchorEl: null })
  useEffect(() => {
    const init = () => {
      let now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth(),
        d = now.getDate()
      if (value && value instanceof Date) {
        y = value.getFullYear()
        m = value.getMonth()
        d = value.getDate()
        setOriginalYear(y)
        setOriginalDay(d)
        setOriginalMonth(m)
      }
      makeCalendar(y, m)
    }
    init()
  }, [])


  const curYear = new Date().getFullYear()
  const curMonth = new Date().getMonth()
  const curDate = new Date().getDate()
  const years = Array.from(new Array(12), (v, i) => curYear - 9 + i)

  const isSelectedDay = (day, status) => {
    if (!status)
      return false

    if (year == originalYear && month == originalMonth && day == originalDay)
      return true

    return false
  }

  const nextMonth = () => {
    let y = year, m = month
    if (m == 11) {
      y++
      m = 0
    }
    else {
      m++
    }
    makeCalendar(y, m)
  }

  const prevMonth = () => {
    let y = year, m = month
    if (m == 0) {
      y--
      m = 11
    }
    else {
      m--
    }
    makeCalendar(y, m)
  }

  const makeCalendar = (y, m) => {
    dispatch({ type: 'init_days' })

    let lastDayOfMonth = new Date(y, m + 1, 0).getDate()

    let startingDayIndexOfMonth = new Date(y, m, 1).getDay()

    setYear(y)
    setMonth(m)
    setTempYear(y)
    setTempMonth(m)

    let dayIndexOfMonth = startingDayIndexOfMonth
    let weekData
    let weekIndexOfMonth = 0
    for (let i = 1; i <= lastDayOfMonth; i++) {
      let dayIndexOfWeek = (dayIndexOfMonth - 1) % 7

      if (i == 1 || dayIndexOfWeek == 0)
        weekData = Array.from(new Array(7), () => 0)

      if (startingDayIndexOfMonth > 1 && i == 1) {
        let lastDayOfLastM = new Date(y, m, 0).getDate()

        for (let j = startingDayIndexOfMonth - 1; j >= 1; j--) {
          weekData[(j - 1) % 7] = { day: lastDayOfLastM - (startingDayIndexOfMonth - 1 - j), status: false }
        }
      }

      weekData[dayIndexOfWeek] = { day: i, status: true }

      if (i == lastDayOfMonth) {
        if (dayIndexOfWeek < 6) {
          for (let j = dayIndexOfWeek + 1; j <= 6; j++) {
            weekData[j] = { day: 1 + (j - dayIndexOfWeek - 1), status: false }
          }
        }

        dispatch({ type: 'add_week', data: weekData })
      }
      else if (dayIndexOfWeek == 6) {
        dispatch({ type: 'add_week', data: weekData })
        weekIndexOfMonth++
      }

      dayIndexOfMonth++
    }
  }

  const selectDay = (day, status) => {
    if (!status)
      return

    // if (new Date(year, month, day + 1).getTime() < new Date().getTime()) return

    setOriginalYear(year)
    setOriginalMonth(month)
    setOriginalDay(day)

    if (!onSelected) {
      return
    }

    onSelected(year, month + 1, day)
    onCancel()
  }

  const isFutureDate = (index) => {
    new Date(tempYear, index).getTime() >= new Date(curYear, curMonth).getTime()
  }

  return (
    <CalendarPickerWrapper width={width}>
      <div className="header">
        <div className="cur-year-month"
          onClick={(e) => { setMonthPopupOptions({ opened: true, anchorEl: e.currentTarget }) }}
        >
          <div className="text">
            <div>{fullMonthNames[month]}</div>
            <div>{year}</div>
          </div>
          <div className="icon">
            <Image src={ICONS.arrowRightBlue} width={6} height={14} />
          </div>
        </div>
        <div className="nav">
          <div className="icon" onClick={() => new Date(tempYear, tempMonth).getTime() > new Date().getTime() || prevMonth()}>
            <IconWrapper bgColor="#dfdfdf" length={30}>
              {/* {new Date(tempYear, tempMonth).getTime() <= new Date().getTime() && (
                <Image src={ICONS.arrowLeft} width={6} height={14} layout="fixed" />
              )} */}
              {/* {new Date(tempYear, tempMonth).getTime() > new Date().getTime() || (
                )} */}
              <Image src={ICONS.arrowLeftBlue} width={6} height={14} layout="fixed" />
            </IconWrapper>
          </div>
          <div className="icon" onClick={nextMonth}>
            <IconWrapper bgColor="#dfdfdf" length={30}>
              <Image src={ICONS.arrowRightBlue} width={6} height={14} />
            </IconWrapper>
          </div>
        </div>
      </div>
      <div className="day-wrapper">
        <div className="label">
          {weekDays.map(v => (
            <label key={v.id}>{v.name}</label>
          ))}
        </div>
        <div className="body">
          {state.days.map((week, i) => (
            <div key={i} className="week">
              {week.map((v, i) => (
                <label
                  key={i}
                  onClick={() => selectDay(v.day, v.status)}
                  className={(!v.status ? "invalid " : "") + (isSelectedDay(v.day, v.status) ? "selectedDate " : "") + (new Date(tempYear, tempMonth, v.day + 1).getTime() < new Date().getTime() ? "past " : "") + (v.day === curDate && month === curMonth && tempYear === curYear ? "today " : "") + "day"}
                >{v.day}</label>
              ))}
            </div>
          ))}
        </div>
      </div>

      <CustomPopover
        open={monthPopupOptions.opened}
        anchorEl={monthPopupOptions.anchorEl}
        onClose={() => setMonthPopupOptions({ opened: false, anchorEl: null })}>
        <PopoverWrapper>
          <div className="main-container">
            <div className="list-wrapper month">
              <div className="scrollbar">
                {fullMonthNames.map((item, index) => (
                  <div
                    key={index}
                    className={"item " + (index == tempMonth ? "selected " : "") + (new Date(tempYear, index).getTime() < new Date(curYear, curMonth).getTime() ? "past " : "")}
                    onClick={() => isFutureDate(index) || setTempMonth(index)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="list-wrapper year">
              <div className="scrollbar">
                {years.map((item, index) => (
                  <div
                    key={index}
                    className={"item center " + (item == tempYear ? "selected " : "") + (item < curYear ? "past " : "")}
                    onClick={() => item >= curYear || setTempYear(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <button onClick={() => setMonthPopupOptions({ opened: false, anchorEl: null })} className="btn">Cancel</button>
            <button onClick={() => {
              makeCalendar(tempYear, tempMonth)
              setMonthPopupOptions({ opened: false, anchorEl: null })
            }} className="btn blue">Done</button>
          </div>
        </PopoverWrapper>
      </CustomPopover>

    </CalendarPickerWrapper>
  )
}