import { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { getTimeslotString } from './utils';
import { ViewWrapper, TimeslotLabel, TimeslotSpace, EventWrapper } from './styled';

const MIN_DURATION = 5; // minimum minutes of availability
const STEP = 60;  // minutes of timeslot

const CalendarView = ({ weekDates, events, onSelect, startTimeEvent, waitList,scrollChangable}) => {
  const viewRef = useRef(null);
  const spaceRef = useRef(null);
  const [curWeekEvents, setCurWeekEvents] = useState([]);
  const [availableSlotTimes, setAvailableSlotTimes] = useState([]);
  
  // Create elements for timeslots e.g. 12 AM to 12 AM
  const displayTimeslotLabels = () => {
    let element = [];
    for (let i = 0; i <= 1440; i += STEP) {      
      if (availableSlotTimes.includes(i))
        element.push(<TimeslotLabel className="time" key={i}>{getTimeslotString(i)}</TimeslotLabel>);
    }
    //console.log(curWeekEvents);
    return element;
  }

  // Create elements for timeslot spaces - where availability created
  const displayTimeslotSpaces = () => {
    let element = [];
    for (let i = 0; i <= 1440; i += STEP) {
      if (availableSlotTimes.includes(i))      
        element.push(<TimeslotSpace className="space" key={i}></TimeslotSpace>);
    }
    return element;
  }

  // Set current week availability from apts on change of startdate
  useEffect(() => {
    let arrNew = [];
    events.map(event => {
      let datetime = moment(new Date(event.date + " 00:00:00"));
      if (weekDates.length && weekDates[0].isSameOrBefore(datetime) && weekDates[weekDates.length - 1].isSameOrAfter(datetime)) {
        arrNew.push(event);
      }
    });
    setCurWeekEvents(arrNew);

  }, [weekDates, events]);

  useEffect( () => {
    let curArrSlots = [];
    curWeekEvents.map( dayEvents => {
      let startTimeslots = dayEvents.bookedTimes.map( st => {
          return st.startTime.split(':').slice(0, -1)[0];
      })    
      let uniqueStartTimeSlots = [...new Set(startTimeslots)];      
      uniqueStartTimeSlots.forEach((slot) => {
        curArrSlots.push(Number(slot)*60); //minutes array available slots
      })
      
    });
    let uniqueCurArrSlots = [...new Set(curArrSlots)].sort();      
    setAvailableSlotTimes(uniqueCurArrSlots);

  },[curWeekEvents])


 useEffect( () => {
  viewRef.current.scrollTop = 0;
 },[scrollChangable]);

  return (
    <ViewWrapper ref={viewRef}> 
      <div className="timeslot-label-wrapper">
        {displayTimeslotLabels()}
      </div>
      <div className="timeslot-space-wrapper" ref={spaceRef}>
        <div>
          {curWeekEvents.map(event => {
            return event.bookedTimes.map(slot => {
              let datetime = moment(new Date(event.date + ' ' + slot.startTime));
              let left = 0;
              weekDates.map((wd, wdIdx) => {
                if (wd.isSame(datetime, 'day'))
                  left = wdIdx * 60;
              })

            //console.log(availableSlotTimes.indexOf(datetime.format("H")* 60))
              let relativeTop = availableSlotTimes.indexOf(datetime.format("H")* 60);
              //let top =  datetime.format("H")* 60 + datetime.format("m") * 1 * 0.8;
              let top =  relativeTop* 60 + datetime.format("m") * 1 * 0.8;
              

              let isActive = false;
              if (datetime.isSame(startTimeEvent))
                isActive = true;
              waitList.map(v => {
                if (datetime.isSame(v))
                  isActive = true;
              })
              return (
                <div key={datetime.format("YYYY-MM-DD HH:mm")} 
                  style={{ position: "absolute", left: left, top: top, zIndex: 10 }}>
                  <EventWrapper active={isActive} onClick={() => onSelect(datetime)}>
                    {datetime.format("h:mm")}
                  </EventWrapper>
                </div>
              );
            })
          })}
          {displayTimeslotSpaces()}
        </div>
      </div>
    </ViewWrapper>
  );
}

export default CalendarView;
