import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import * as moment from "moment/moment";
import 'moment/locale/en-gb';

import Popover from '@mui/material/Popover'
import { CalendarPicker } from '../../../../../../components/CalendarPicker';
import { ICONS } from '../../../../../../common/utils/styleGuide'
import useJumpDate from "./context";

const CustomPopover = ({ children, open, onClose, anchorEl }) => {
  return (
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
        horizontal: 'center',
      }}
      style={{ marginTop: 10 }}
    >
      {children}
    </Popover>
  )
}

export default function DateRangeComponent(props) {
  const {
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
  } = props

  const [today, setToday] = useState(new Date)

  const from_date = moment(today).startOf('week');
  const _today = moment(today)
  const to_date = _today.endOf('week');

  const { jumpDate, updateJumpDate, firstDate } = useJumpDate();

  const [calendarPopupOptions, setCalendarPopupOptions] = useState({ opened: false, anchorEl: null })

  useEffect(() => {
    if (firstDate) {
      setToday(firstDate)
    }
  }, [firstDate])

  return (
    <DateRangeTitleWrapper>
      <div className="date-range">
        <Image
          src={ICONS.arrowLeft}
          width={8} height={12}
        />
        <div className="date-range-info">
          <div className="date-unit">
            {from_date.format('MMM')} {from_date.format('DD')}, {from_date.format('YYYY')}</div>
          <div>-</div>
          <div className="date-unit">{to_date.format('MMM')} {to_date.format('DD')}, {to_date.format('YYYY')}</div>
        </div>
        <Image
          src={ICONS.arrowRight}
          width={8} height={12}
        />
      </div>
      <div className="calendar-group">
        <label className="dp-wrapper">
          <CustomPopover
            open={calendarPopupOptions.opened}
            anchorEl={calendarPopupOptions.anchorEl}
            onClose={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
          >
            <PopoverWrapper widht={200}>
                <CalendarPicker
                  width={330}
                  value={jumpDate}
                  onCancel={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
                  onSelected={(y, m, d) => {
                    let newValue = new Date(y, m - 1, d);
                    let today = new Date();
                    if (newValue < today)
                      newValue = today;
                    updateJumpDate(newValue)
                    setToday(newValue)
                    setSelectedDateToFetchSlots(newValue)
                  }}
                  minDate={new Date()}
                />
            </PopoverWrapper>
          </CustomPopover>
          <div className="calendar">
            <Image src={ICONS.calendar} width={25} height={25} onClick={(e) => setCalendarPopupOptions({ opened: true, anchorEl: e.currentTarget })} />
          </div>
        </label>
      </div>
    </DateRangeTitleWrapper>
  )
}

const DateRangeTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 34px;
  .date-range {
    display: flex;
    column-gap: 10px;
    align-items: center;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
    .date-range-info {
      display: flex;
      column-gap: 5px;
      .date-unit {
        width: 85px;
        text-align: center;
      }
    }
  }
  .calendar-group {
    display: flex;
    column-gap: 10px;
    .dp-wrapper {
      position: relative;
      position: relative;
      width: 30px;
      height: 30px;
      div {
        padding: 0;
      }
      fieldset {
        border: none;
        width: 10px;
        height: 10px;
        padding: 0;
      }
      input {
        width: 30;
        overflow: hidden;
        height: 30px;
        padding: 0;
        z-index: 1;
        opacity: 0;
      }
      button {
        padding: 0;
        opacity: 0;
        z-index: 1;
        transform: translateX(-12px);
      }
      .calendar {
        position: absolute;
        top: 0;
        left: 4px;
        z-index: 0;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`

const PopoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 10px 5px 5px;
  width: ${props => props.width}px;
  //border: 1px solid #C4C4C4;
  //border-radius: 10px;
  
  .item {
    display: grid;
    grid-template-columns: 0.55fr 0.45fr;
    padding: 5px 0;
    .title {
      font-family: SF Pro Text;
      font-size: 10px;
      font-weight: 500;
      line-height: 10px;

      color: #000000;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    
    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: -8px; margin-right: -3px;
    }
    .mark {
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }
`