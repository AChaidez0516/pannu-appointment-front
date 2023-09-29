import { useMemo, useState } from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// import 'moment-timezone'
import 'moment/locale/en-gb';
import { CalendarWrapper } from './styled'
import CustomWeekView from './CustomWeekView'
import CustomToolbar from './CustomToolBar'
import CustomEventWrapper from './CustomEventWrapper'
import CustomEvent from './CustomEvent'
const localizer = momentLocalizer(moment)

function CalendarContent({events}) {
  
  const {components, defaultDate, views} = useMemo(() => ({
    components: {
      toolbar: CustomToolbar,
      eventWrapper: CustomEventWrapper,
      event: CustomEvent
    },
    defaultDate: new Date(),
    views: {
      week: CustomWeekView,
    },
  }), [])

  return (
    <CalendarWrapper>
      <h6>Click to view more information on the provider</h6>
      <Calendar 
        defaultDate={defaultDate}
        views={views}
        localizer={localizer}
        defaultView={'week'}
        step={30}
        events={events}
        min={moment('9:00am', 'h:mma').toDate()}
        max={moment('5:00pm', 'h:mma').toDate()}
        components={components}
        popup
      />
    </CalendarWrapper>
  )
}

export default CalendarContent