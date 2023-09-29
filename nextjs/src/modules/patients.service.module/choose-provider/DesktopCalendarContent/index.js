import { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
// import 'moment-timezone'
import 'moment/locale/en-gb';
import { CalendarWrapper, SKBodyWrapper, SKHeaderWrapper, SKWrapper } from './styled'
import CustomToolbar from './CustomToolBar'
import CustomEventWrapper from './CustomEventWrapper'
import CustomEvent from './CustomEvent'



const localizer = momentLocalizer(moment)

function DesktopCalendarContent({events}) {

  const {components, defaultDate} = useMemo(() => ({
    components: {
      toolbar: CustomToolbar,
      eventWrapper: CustomEventWrapper,
      event: CustomEvent
    },
    defaultDate: new Date(),
  }), [])

  return (
    <CalendarWrapper>
      <Calendar 
        defaultDate={defaultDate}
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

function SkeletonComponent () {
  return (
    <SKWrapper>
      <SKHeaderWrapper>
        <div className='date-range'>
          <Skeleton width={12} height={12}/>
          <Skeleton width={152} height={12}/>
          <Skeleton width={12} height={12}/>
        </div>
        <div className='note'>
          <Skeleton width={268} height={14} />
        </div>
        <div className='week-title'>
          <Skeleton width={'100%'} height={38} />
        </div>
      </SKHeaderWrapper>
      <SKBodyWrapper>
        <Skeleton width={'100%'} height={350} />
      </SKBodyWrapper>
    </SKWrapper>
  )
}

export default DesktopCalendarContent