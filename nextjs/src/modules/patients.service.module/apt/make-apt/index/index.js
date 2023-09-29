import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import useWindowDimensions, { DEVICE_TYPE } from '../../../../../common/hooks/useWindowDimensions'

import { getNewReasons, getPreviousReasons } from '../../../../../common/lib/appointment'

import {
  MakeAptWrapper,
  MainContentWrapper,
} from './styled'

import {
  fakePastReasons,
  fakeAllReasons,
  fakeNewReasons,
  regularEvents,
  WEEK_BUSY_TIMES,
  APT_KINDS,
  INIT_URGENT_DETAIL,
  CALENDAR_TYPE,
  HEADER_PROPS,
  PAYMENT_CARD_LIST,
  paymentCardsReducer,
  APT_FORM_INIT,
  aptFormReducer,
} from './data'

import Header from '../../shared/Header'
import StepComponent from '../shared/StepComponent'
import StepZeroComponent from '../step-0/StepZeroComponent'
import StepOneComponent from '../step-1/StepOneComponent'
import StepTwoComponent from '../step-2/StepTwoComponent'
import StepThreeComponent from '../step-3/StepThreeComponent'
import {
  COUNT_SECTIONS,
  HEADER_HEIGHT,
  MAIN_BODY_PADDING_X,
  MAIN_BODY_PADDING_Y,
  SECTION_GAP,
  SECTION_INNER_PADDING_X_MOBILE
} from '../shared/constants'


const busyTimesProps = {
  busyTimes: WEEK_BUSY_TIMES.filter(w => w?.isBusy),
  lessBusyTimes: WEEK_BUSY_TIMES.filter(w => !w?.isBusy),
  closedTimes: WEEK_BUSY_TIMES.filter(w => w?.isClosed)
}


function MakeApt({ provider }) {

  const PROVIDER_ID = provider.id


  const { width, height, device } = useWindowDimensions()
  const deviceWidth = width
  const sectionHeight = height 
    - HEADER_HEIGHT 
    - 2 * MAIN_BODY_PADDING_Y
  const sectionWidth = Math.floor(deviceWidth
    - 2 * MAIN_BODY_PADDING_X 
    - 3 * SECTION_GAP 
  ) / COUNT_SECTIONS

  const patient = null; // useSelector((state) => state.reg.user)

  /** UI logic */
  const [currentStepNumber, setCurrentStepNumber] = useState(0)
  // const [headerProps, setHeaderProps] = useState(HEADER_PROPS)
  /** basic data to display */
  // const [newReasons, setNewReasons] = useState([])
  // {checked: user select the reason form this}
  const [events, setEvents] = useState([])

  const [urgentDetails, setUrgentDetail] = useState(INIT_URGENT_DETAIL)
  const [selectedDateToFetchSlots, setSelectedDateToFetchSlots] = useState(new Date()) // the week user want to see whose slots 
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [usePoem, setUsePoem] = useState(true)
  /** this state to send data */
  const [aptKind, setAptKind] = useState(null)  //one obj of APT_KINDS  Fr, Fo, W
  const [isFirstAptToDoctor, setIsFirstAptToDoctor] = useState(false);
  const [previousReasonsToSelect, setPreviousReasonsToSelect] = useState([])
  const [newReasonsToSelect, setNewReasonsToSelect] = useState([])
  const [selectedReasons, setSelectedReasons] = useState([])
  const [exitPastReasons, setExitPastReasons] = useState(true)
  const [isDoneSelectReasons, setIsDoneSelectReasons] = useState(true);
  const [isVideo, setIsVideo] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [detailReason, setDetailReason] = useState('')
  const [startTimeEvent, setStartTimeEvent] = useState(null) //{event: Event} time which user wants to book
  const [waitList, setWaitList] = useState([]) // list of events which user desire to book
  const [calendarType, setCalendar] = useState(CALENDAR_TYPE.find(cal => cal.value === 'REGULAR')) // apt type which user want to book calendarType: CALENDAR_TYPE.any, 0: first available apt


  const [aptForm, dispatchAptForm] = useReducer(aptFormReducer, APT_FORM_INIT)
  const [paymentCards, dispatchPaymentCards] = useReducer(paymentCardsReducer, PAYMENT_CARD_LIST)

  const [stepStatus, setStepStatus] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  })

  const [isSubmit, setIsSubmit] = useState(false)



  const router = useRouter()
  if (!patient) {
    // user is not logged in yet. Please login
    // router.push('/auth/login')
  }

  function isShowSection(currentStepNumber, sectionStep, device) {
    if (device === DEVICE_TYPE.DESKTOP) {
      return sectionStep <= currentStepNumber
    }
    return currentStepNumber === sectionStep
  }

  useEffect(() => {
    const initialize = async () => {
      const previousReasons = await getPreviousReasons(PROVIDER_ID)
      setPreviousReasonsToSelect(previousReasons
        .map(reason => ({ ...reason, checked: (reason?.isChangeable ? false : true) })))

      const newReasons = await getNewReasons(PROVIDER_ID)
      setNewReasonsToSelect(newReasons
        .map(reason => ({ ...reason, checked: false })));
      // define fetch function by regular calendar
      setEvents(regularEvents) // fetching Regular events initially
    }
    initialize()
  }, [])

  useEffect(() => {
    const fetchEventsByCalendarType = async (calendarType, selectedDateToFetchSlots) => {
      try {
        console.log('successfully fetched for given type and week: ', regularEvents);
        setEvents(regularEvents)
      } catch (error) {
        // exception handling   
      }
    }
    fetchEventsByCalendarType(calendarType, selectedDateToFetchSlots)
  }, [calendarType, selectedDateToFetchSlots])


  // useEffect(() => {
  //   if (currentStepNumber === 0 || currentStepNumber === 2) {
  //     setHeaderProps({...HEADER_PROPS, currentStepNumber: currentStepNumber, setCurrentStepNumber: setCurrentStepNumber})
  //   }
  //   if (currentStepNumber === 1) {
  //     setHeaderProps(v => ({...v, title: calendarType.label, currentStepNumber: currentStepNumber, setCurrentStepNumber: setCurrentStepNumber}))
  //   }
  // }, [currentStepNumber])


  /** validate step1 */
  useEffect(() => {
    if (!aptKind) {
      setStepStatus({ ...stepStatus, step1: false })
      return
    }
    if (selectedReasons.length < 1) {
      setStepStatus({ ...stepStatus, step1: true })
      return
    }
    setStepStatus({ ...stepStatus, step1: true })
  }, [aptKind, selectedReasons])

  /** validate step2 */
  useEffect(() => {
    if (!startTimeEvent) {
      setStepStatus({ ...stepStatus, step2: false })
      return
    }
    setStepStatus({ ...stepStatus, step2: true })
  }, [startTimeEvent])

  /** validate step2 */
  useEffect(() => {
    if (!agreeTerms) {
      setStepStatus({ ...stepStatus, step3: false })
      return
    }
    setStepStatus({ ...stepStatus, step3: true })
  }, [agreeTerms])

  const handleDeleteEventFromBookSlot = (eventId) => {
    setStartTimeEvent(null);
  }

  const handleDeleteEventFromWaitList = (event) => {
    /** delete event from waitList */
    setWaitList(prevWaitList =>
      prevWaitList.filter(eve => !eve.isSame(event)))
    /** set isInWaitList: false from events  */
  }

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
  }

  const headerProps = {
    title: 'Appointment',
    backUrl: localStorage.getItem('parentUrl')?localStorage.getItem('parentUrl'):'/auth/login/',
    countOfNotifications: 20,
    currentStepNumber,
    setCurrentStepNumber,
    isDoneSelectReasons,
    setIsDoneSelectReasons,
    calendarType
  }

  const reasonListComponentProps = {
    isFirstAptToDoctor,
    newReasonsToSelect,
    previousReasonsToSelect,
    setPreviousReasonsToSelect,
    selectedReasons,
    setSelectedReasons,
    exitPastReasons,
    isDoneSelectReasons,
    setIsDoneSelectReasons
  }
  const stepZeroComponentProps = {
    provider,
    reasonListComponentProps,
    busyTimesProps,
    detailReason,
    setDetailReason,
    isVideo,
    setIsVideo,
    isPhone,
    setIsPhone,
    aptKind,
    setAptKind,
    APT_KINDS,
    isSubmit,
    isDoneSelectReasons,
    setIsDoneSelectReasons
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
  const appointmentCalendarProps = {
    providerId: PROVIDER_ID,
    startTimeEvent,
    setStartTimeEvent,
    calendarType,
    waitList,
    setWaitList,
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
    isSubmit,
    sectionWidth,
  }
  const stepOneComponentProps = {
    calendarType,
    busyTimesProps,
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
    appointmentCalendarProps,
    chooseCalendarSectionComponentProps,
    isSubmit,
  }

  const bookedAptInfoComponentProps = {
    calendarType,
    setCurrentStepNumber,
    startTimeEvent,
    waitList,
  }

  const stepTwoComponentProps = {
    provider,
    reasonListComponentProps,
    detailReason,
    setDetailReason,
    bookedAptInfoComponentProps,
    calendarType,
    usePoem,
    setUsePoem,
    agreeTerms,
    setAgreeTerms,
    isSubmit,
    isReschedule: false
  }

  const stepThreeComponentProps = {
    paymentCards,
    dispatchPaymentCards,
    isSubmit,
  }

  return (
    <MakeAptWrapper>
      <Header {...headerProps} />
      <MainContentWrapper
        sectionHeight={sectionHeight}
        sectionWidth={sectionWidth}
        paddingX_Mobile={SECTION_INNER_PADDING_X_MOBILE}
        paddingX={MAIN_BODY_PADDING_X}
        paddingY={MAIN_BODY_PADDING_Y}
      >
        <div className='inner-content-wrapper'>
          {isShowSection(currentStepNumber, 0, device) &&
            <div className='section'>
              <StepZeroComponent
                {...stepZeroComponentProps}
              />
              <StepComponent
                stepNumber={0}
                currentStepNumber={currentStepNumber}
                setCurrentStepNumber={setCurrentStepNumber}
                isValidate={stepStatus.step1}
                setIsSubmit={setIsSubmit}
                selectedReasons={selectedReasons}
                isDoneSelectReasons={isDoneSelectReasons}
                setIsDoneSelectReasons={setIsDoneSelectReasons}
                aptKind={aptKind}
              />
            </div>
          }
          {isShowSection(currentStepNumber, 1, device) &&
            <div className='section'>
              <StepOneComponent
                {...stepOneComponentProps}
              />
              <StepComponent
                stepNumber={1}
                currentStepNumber={currentStepNumber}
                setCurrentStepNumber={setCurrentStepNumber}
                isValidate={stepStatus.step2}
                setIsSubmit={setIsSubmit}
                startTimeEvent={startTimeEvent}
              />
            </div>
          }
          {isShowSection(currentStepNumber, 2, device) &&
            <div className='section'>
              <StepTwoComponent
                {...stepTwoComponentProps}
              />
              <StepComponent
                stepNumber={2}
                currentStepNumber={currentStepNumber}
                setCurrentStepNumber={setCurrentStepNumber}
                isValidate={stepStatus.step3}
                setIsSubmit={setIsSubmit}
                agreeTerms={agreeTerms}
              />
            </div>
          }
          {isShowSection(currentStepNumber, 3, device) &&
            <div className='section'>
              <StepThreeComponent
                {...stepThreeComponentProps}
              />
              <StepComponent
                stepNumber={3}
                currentStepNumber={currentStepNumber}
                setCurrentStepNumber={setCurrentStepNumber}
                isValidate={stepStatus.step4}
                setIsSubmit={setIsSubmit}
              />
            </div>
          }
        </div>
      </MainContentWrapper>
    </MakeAptWrapper>
  )
}

export default MakeApt

MakeApt.propTypes = {
  provider: PropTypes.object.isRequired,
}


