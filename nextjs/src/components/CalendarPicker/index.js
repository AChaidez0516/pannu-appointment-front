import Image from 'next/image'
import { useEffect, useReducer, useState } from 'react'
import {
  CalendarPickerWrapper
} from './styled'
import { ICONS } from '../../common/utils/styleGuide'
import { PopoverWrapper } from './styled';
import Popover from '@mui/material/Popover'

import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#EEEEEE',
        },
      },
    },
  },
});

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
export const CustomPopover = ({ children, open, onClose, anchorEl }) => {
  return (
    <ThemeProvider theme={theme}>
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      style={{ marginTop: 10 }}
    >
      {children}
    </Popover>
    </ThemeProvider>
  )
}
export const CalendarPicker = ({ width = 370, value, onSelected, onCancel }) => {
  const weekDays = [
    { id: 0, name: 'Mon' },
    { id: 1, name: 'Tue' },
    { id: 2, name: 'Wed' },
    { id: 3, name: 'Thu' },
    { id: 4, name: 'Fri' },
    { id: 5, name: 'Sat' },
    { id: 6, name: 'Sun' },
  ]

  const [state, dispatch] = useReducer(reducer, { days: [] })
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState(0)


  const [tempYear, setTempYear] = useState(0)
  const [tempMonth, setTempMonth] = useState(0)

  const [originalYear, setOriginalYear] = useState(0)
  const [originalMonth, setOriginalMonth] = useState(0)
  const [originalDay, setOriginalDay] = useState(0)


  const [monthPopupOptions, setMonthPopupOptions] = useState({ opened: false, anchorEl: null })

  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
  const curYear = new Date().getFullYear()
  const years = Array.from(new Array(12), (v, i) => curYear - 9 + i)

  const init = () => {
    if ( !value || (!(value instanceof Date))) value = new Date()

    let now = new Date(value), y = now.getFullYear(), m = now.getMonth(), d = now.getDate()

    setOriginalYear(y)
    setOriginalDay(d)
    setOriginalMonth(m)

    makeCalendar(y, m)
  }

  const isSelectedDay = (day, status) => {
    if (!status)
      return false

    if (year == originalYear && month == originalMonth && day == originalDay)
      return true

    return false
  }

  useEffect(() => {
    init()

  }, [])

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

        for (let j = startingDayIndexOfMonth - 1; j >= 1; j--)
        {
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

        dispatch({type: 'add_week', data: weekData})
      }
      else if (dayIndexOfWeek == 6) {
        dispatch({type: 'add_week', data: weekData})
        weekIndexOfMonth++
      }

      dayIndexOfMonth++
    }
  }

  const selectDay = (day, status) => {
    if (!status)
      return

    setOriginalYear(year)
    setOriginalMonth(month)
    setOriginalDay(day)

    if (!onSelected) {
      return
    }

    onSelected(year, month + 1, day)
    onCancel()
  }

  return (
    <CalendarPickerWrapper width={width}>
      <div className="header">
        <div className="cur-year-month" >
          <span className="text"
                onClick={ (e) => {setMonthPopupOptions({ opened: true, anchorEl: e.currentTarget })} }>
            <label>{fullMonthNames[month]}</label>
            <label>{year}</label>
            <span className="icon"><Image src={ICONS.arrowRightBlue} width={6} height={14} /></span>
          </span>
        </div>
        <div className="nav">
          <span className="icon" onClick={prevMonth}><Image src={ICONS.arrowLeftBlue} width={6} height={14} /></span>
          <span className="icon" onClick={nextMonth}><Image src={ICONS.arrowRightBlue} width={6} height={14} /></span>
        </div>
      </div>
      <div className="day-wrapper">
        <div className="label">
          { weekDays.map(v => (
            <label key={v.id}>{v.name}</label>
          )) }
        </div>
        <div className="body">
          { state.days.map((week, i) => (
            <div key={i} className="week">
              { week.map(v => (
                <label onClick={() => selectDay(v.day, v.status)} className={ (!v.status ? "invalid " : "") + (isSelectedDay(v.day, v.status) ? "today " : "") + "day"}>{v.day}</label>
              )) }
            </div>
          )) }
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
                { fullMonthNames.map((item, index ) => (
                  <div onClick={ () => {
                    setTempMonth(index)
                  } } className={"item " + (index == tempMonth ? "selected" : "")} key={index}>{item}</div>
                )) }
              </div>
            </div>
            <div className="list-wrapper year">
              <div className="scrollbar">
                { years.map((item, index ) => (
                  <div onClick={ () => {
                    setTempYear(item)
                  } } className={"item center " + (item == tempYear ? "selected" : "")} key={index}>{item}</div>
                )) }
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <button onClick={() => setMonthPopupOptions({ opened: false, anchorEl: null })} className="btn">Cancel</button>
            <button onClick={ () => {
              makeCalendar(tempYear, tempMonth)
              setMonthPopupOptions({ opened: false, anchorEl: null })
            } } className="btn blue">Done</button>
          </div>
        </PopoverWrapper>
      </CustomPopover>

    </CalendarPickerWrapper>
  )
}