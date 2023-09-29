import 'react-loading-skeleton/dist/skeleton.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// import 'moment-timezone'
import 'moment/locale/en-gb';
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CalendarWrapper, ErrorMsg } from './styled'
import CustomToolbar from './CustomToolBar'
import CustomEventWrapper from './CustomEventWrapper'
import CustomEvent from './CustomEvent'
import SelectEventComponent from './SelectEventComponent'
import { CALENDAR_INNER_PADDING_X } from '../../shared/constants';
import { endOfToday } from 'date-fns';
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import SimpleBar from 'simplebar-react'

// moment.tz.setDefault('America/Los_Angeles')
const localizer = momentLocalizer(moment)

function AppointmentCalendar(props) {
  const {
    events,
    setEvents,
    startTimeEvent,
    setStartTimeEvent,
    calendarType,
    waitList,
    setWaitList,
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
    isSubmit,
    sectionWidth,
  } = props
  
  const [closeEvents, setCloseEvents] = useState([]);
  const [selectedCloseEvent, setSelectedCloseEvent] = useState(null);
  const [showCloseEventsModal, setShowCloseEventsModal] = useState(false);

  const { components, defaultDate } = useMemo(() => ({
    components: {
      toolbar: (props) => <CustomToolbar {...props}
        selectedDateToFetchSlots={selectedDateToFetchSlots}
        setSelectedDateToFetchSlots={setSelectedDateToFetchSlots}
        sectionWidth={sectionWidth}
      />,
      eventWrapper: CustomEventWrapper,
      event: CustomEvent
    },
    defaultDate: selectedDateToFetchSlots
  }), []) // '2022-05-27T13:45:00-05:00'

  const addEventSlot = (selectedEvent) => {
    if (calendarType?.value === 'WAIT_LIST') {
      if (waitList.length === 5) {
        alert('You can select up to 5 slots!')
        return
      }
      /** add `isInWaitList` prop to display  */
      setEvents(prevEvents =>
        prevEvents.map(eve =>
          eve.id === selectedEvent.id ? ({ ...eve, isInWaitList: true }) : eve))
      setWaitList(prev => ([...prev, selectedEvent]))
    } else {
      setEvents(prevEvents =>
        prevEvents.map(eve =>
          eve.id === selectedEvent.id ? ({ ...eve, isBookedSlot: true }) : ({ ...eve, isBookedSlot: false })))
      setStartTimeEvent(selectedEvent)
    }
  }

  const handleSelectedEvent = (selectedEvent) => {
    let closeEvents = [];

    events.map(event => {
      let diffMins = moment.duration(moment(event.start).diff(selectedEvent.start)).asMinutes();
      if (diffMins > -60 && diffMins < 60) {
        closeEvents.push(event);
      }
    });

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
    <>
      <CalendarWrapper paddingX={CALENDAR_INNER_PADDING_X}>
        <Calendar
          defaultDate={defaultDate}
          onSelectEvent={(event) => handleSelectedEvent(event)}
          localizer={localizer}
          defaultView={'week'}
          step={15}
          timeslots={4}
          events={events}
          min={moment('9:00am', 'h:mma').toDate()}
          max={moment('5:00pm', 'h:mma').toDate()}
          components={components}
          startAccessor="start"
          endAccessor="end"
          popup
        />
      </CalendarWrapper>
      {isSubmit && !startTimeEvent &&
        <ErrorMsg>Start time is required*</ErrorMsg>
      }
      
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
            events={closeEvents}
            selectedEvent={selectedCloseEvent}
            setSelectedEvent={setSelectedCloseEvent}
          />
        </SimpleBar>
      </SelectPopupModal>
    </>
  )
}

AppointmentCalendar.propTypes = {
  isSubmit: PropTypes.bool.isRequired,
}

export default AppointmentCalendar