import { useState, useEffect } from 'react'
import StepOneComponent from "../../make-apt/step-1/StepOneComponent";
import { AptRescheduleViewWrapper, FooterWrapper } from './styled'

import {
    regularEvents,
    WEEK_BUSY_TIMES,
    APTTYPE,
    INIT_URGENT_DETAIL,
    CALENDAR_TYPE,
    RESCHEDULE_FLOW_ORDER
} from '../../make-apt/index/data'

const busyTimesProps = {
    busyTimes: WEEK_BUSY_TIMES.filter(w => w?.isBusy),
    lessBusyTimes: WEEK_BUSY_TIMES.filter(w => !w?.isBusy),
    closedTimes: WEEK_BUSY_TIMES.filter(w => w?.isClosed)
}

const PROVIDER_ID = 16

export default function AptRescheduleView(props) {


    const {
        startTimeEvent,
        setStartTimeEvent,
        calendarType,
        setCalendar,
        waitList,
        setWaitList,
        defaultUrgentData,
        topTitle,
        onCancel,
        onNext
    } = props;

    const [events, setEvents] = useState(regularEvents);
    const [urgentDetails, setUrgentDetail] = useState(!defaultUrgentData?INIT_URGENT_DETAIL:defaultUrgentData);
    const [scrollChangable, setScrollChangable] = useState(false);
    const changeCalendarType = (calendarTypeId) => {
        // change page title
        // setHeaderProps(prev => ({ ...prev, title: CALENDAR_TYPE.find(cal => cal.id === calendarTypeId).label }))

        // clear selected startTimeEvent, in case not-waitlist
        if (calendarTypeId !== 4) {
            setStartTimeEvent(null)
        }
        // events: set is BookedSlot:false, isInWaitList:false, if fetch new events for given type, it will be doen auto

        // waitList=[] if past was waitlist
        setWaitList([])

        /** update calendarType */
        setCalendar(CALENDAR_TYPE.find(cal => cal.id === calendarTypeId))
        // will fetch events, setEvents by effect
        setScrollChangable(calendarTypeId);
        setUrgentDetail(INIT_URGENT_DETAIL)
    }
    
    const handleDeleteEventFromBookSlot = () => {
        setStartTimeEvent(null);
        if (calendarType.value == APTTYPE.REGULAR)
            setWaitList([]);
    }

    const handleDeleteEventFromWaitList = (event) => {
        setWaitList(prevWaitList => prevWaitList.filter(eve => !eve.isSame(event)))
    }

    const appointmentCalendarProps = {
        providerId: PROVIDER_ID,
        startTimeEvent,
        setStartTimeEvent,
        calendarType,
        waitList,
        setWaitList,
        scrollChangable
    }

    const chooseCalendarSectionComponentProps = {
        calendarType,
        changeCalendarType,
        urgentDetails,
        setUrgentDetail,
        startTimeEvent,
        setStartTimeEvent,
        handleDeleteEventFromWaitList,
        handleDeleteEventFromBookSlot,
        waitList,
    }

    useEffect(() => {
        console.log(urgentDetails)
    },[urgentDetails])
    return (
        <div className="section" style={{ position: "relative", paddingTop: 0 }}>
            <AptRescheduleViewWrapper>
                <StepOneComponent                
                    calendarType={calendarType}
                    topTitle={topTitle}
                    busyTimesProps={busyTimesProps}
                    appointmentCalendarProps={appointmentCalendarProps}
                    chooseCalendarSectionComponentProps={chooseCalendarSectionComponentProps}
                />
                <FooterWrapper>
                    <div className="btn btn-cancel">
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                    <div className="btn btn-next">
                        <button onClick={()=>onNext(urgentDetails)} disabled={startTimeEvent ? false : true}>Next</button>
                    </div>
                </FooterWrapper>
            </AptRescheduleViewWrapper>
        </div>
    )
}
