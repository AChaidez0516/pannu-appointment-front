import { useState, useEffect } from 'react'
import moment from 'moment'
import { HeaderWrapper, HeaderDateItem } from './styled'

const CalendarHeader = ({ startDate, weekDates, handleChangeStartDate }) => {
  const navigate2Days = (direction = 1) => {
    // if (direction == -1 && startDate.isSame(new Date(), 'day')) {
    //   return;
    // }


    let date = moment(startDate).add(2 * direction, 'days');
    console.log(startDate, date);
    handleChangeStartDate(date);
  }

  //style={{borderColor: startDate.isSame(new Date(), 'day') ? "#aaaaaa" : "#173FD4"}}  
  //stroke={startDate.isSame(new Date(), 'day') ? "#aaaaaa" : "#173FD4"}
  return (
    <HeaderWrapper>
      <div className="prev-2days-icon" onClick={() => navigate2Days(-1)} >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12L5.28572 12" stroke="#173FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.2852 18L5.28516 12L11.2852 6" stroke="#173FD4"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {weekDates.map((date, index) => {
        return <HeaderDateItem key={date.format("YYYY-MM-DD")}>{date.format('ddd')}<br/>{date.format('DD')}</HeaderDateItem>;
      })}
      <div className="next-2days-icon" onClick={() => navigate2Days(1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12L18.7143 12" stroke="#173FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.7148 6L18.7148 12L12.7148 18" stroke="#173FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </HeaderWrapper>
  );
}

export default CalendarHeader;
