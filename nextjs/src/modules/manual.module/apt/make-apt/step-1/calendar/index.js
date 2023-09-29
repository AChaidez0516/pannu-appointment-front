import { useState, useEffect } from 'react'
import moment from 'moment'
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import { getAvailableTimeslots } from '../../../../../../common/lib/appointment'
import SimpleBar from 'simplebar-react'
import CalendarToolbar from "./CalendarToolbar";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";
import SelectEventComponent from './SelectEventComponent'
import { CalendarWrapper, CalendarBody } from "./styled";

const TODAY = moment({hour: 0, minute: 0, seconds: 0});

const Calendar = ({ 
  providerId,
  startTimeEvent,
  setStartTimeEvent,
  calendarType,
  waitList,
  setWaitList,
  scrollChangable
}) => {
  const [startDate, setStartDate] = useState(TODAY);
  const [endDate, setEndDate] = useState(TODAY);
  const [weekDates, setWeekDates] = useState([]);

  const [events, setEvents] = useState([]);
  const [closeEvents, setCloseEvents] = useState([]);
  const [selectedCloseEvent, setSelectedCloseEvent] = useState(null);
  const [showCloseEventsModal, setShowCloseEventsModal] = useState(false);

  useEffect(() => {
    let i = 0;
    let dates = [], midDate;
    let date = moment(startDate);

    while (1) {
      if (date.format('d') != 0 && date.format('d') != 6) {
        i ++;
        dates.push(moment(date));
        if (i == 5) {
          setEndDate(date);
          setWeekDates(dates);
          break;
        }
        if (i == 3) {
          midDate = date.format('YYYY-MM-DD');
        }
      }
      date = date.add(1, 'days');
    }

    const fetchTimeslots = async () => {
      const timeslots = await getAvailableTimeslots(midDate, providerId)
      setEvents(timeslots)
    }
    fetchTimeslots();
  }, [startDate]);

  const handleChangeStartDate = (newDate) => {
    if (newDate.isBefore(TODAY, 'day')) {
      setStartDate(TODAY);
    } else {
      setStartDate(newDate);
    }
  }

  const addEventSlot = (selectedEvent) => {
    if (calendarType?.value === 'WAIT_LIST') {
      if (waitList.length === 5) {
        alert('You can select up to 5 slots!')
        return
      }
      setWaitList(prev => ([...prev, selectedEvent]))
    } else {
      setStartTimeEvent(selectedEvent)
    }
  }

  const handleSelectEvent = (selectedEvent) => {
    let closeEvents = [];
    let selectedEventHour = moment(new Date(selectedEvent)).format('HH')
    let selectedEventDate = moment(new Date(selectedEvent)).format('YYYY-MM-DD')
    let selectedDay = events.filter(( eVal ) => eVal.date==selectedEventDate)
    let selectedDayAvailableSlots = selectedDay[0].bookedTimes.filter((sVal)=>{
      return sVal.startTime.split(':')[0]==selectedEventHour
    })
    selectedDayAvailableSlots.sort((a, b) => {
      return Number(a.startTime.split(':')[1]) - Number(b.startTime.split(':')[1])
    })
    selectedDayAvailableSlots.map((each)=>{
      let datetime = moment(new Date( selectedEventDate + ' ' + each.startTime));
      closeEvents.push(datetime);
    })
    // events.map(event => {
    //   event.bookedTimes.map(slot => {
    //     let datetime = moment(new Date(event.date + ' ' + slot.startTime));
    //     let diffMins = moment.duration(datetime.diff(selectedEvent)).asMinutes();
    //     if (diffMins >= -30 && diffMins < 30) {
    //       closeEvents.push(datetime);
    //     }
    //   })
    // });

    if (closeEvents.length > 1) {
      setCloseEvents(closeEvents);
      setSelectedCloseEvent(null);
      setShowCloseEventsModal(true);
    } else {
      addEventSlot(selectedEvent);
    }
  }

  const handleConfirm = () => {
    addEventSlot(selectedCloseEvent);
    setCloseEvents([]);
    setSelectedCloseEvent(null);
    setShowCloseEventsModal(false);
  }

  const handleCancel = () => {
    setCloseEvents([]);
    setSelectedCloseEvent(null);
    setShowCloseEventsModal(false);
  }

  return (
    <CalendarWrapper>
      <CalendarToolbar startDate={startDate} endDate={endDate} handleChangeStartDate={handleChangeStartDate} />
      <CalendarBody>
        <div className="description">Click to select the start time of the appointment you want</div>
        <CalendarHeader startDate={startDate} weekDates={weekDates} handleChangeStartDate={handleChangeStartDate} />
        <CalendarView 
            weekDates={weekDates} 
            events={events} 
            onSelect={handleSelectEvent} 
            startTimeEvent={startTimeEvent} 
            waitList={waitList} 
            scrollChangable={scrollChangable} />
      </CalendarBody>      
      <SelectPopupModal
        onClose={() => setShowCloseEventsModal(false)}
        show={showCloseEventsModal}
        items={[]}
        isConformButton={true}
        isConfirmDisabled={selectedCloseEvent ? false : true}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      >
        <SimpleBar style={{ maxHeight: 400 }}>
          <SelectEventComponent
            key={Math.random}
            events={closeEvents}
            selectedEvent={selectedCloseEvent}
            setSelectedEvent={setSelectedCloseEvent}
          />
        </SimpleBar>
      </SelectPopupModal>
    </CalendarWrapper>
  );
}

export default Calendar;
