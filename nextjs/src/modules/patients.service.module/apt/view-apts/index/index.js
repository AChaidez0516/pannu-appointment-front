import { useState } from "react";
import { Router, useRouter } from 'next/router';
import useWindowDimensions, { DEVICE_TYPE } from "../../../../../common/hooks/useWindowDimensions";
import { getAppointments, postAppointmentCheckout } from "../../../../../common/lib/appointment"
import {
  HEADER_HEIGHT,
  MAIN_BODY_PADDING_Y
} from "../../make-apt/shared/constants";
import {
  CALENDAR_TYPE
} from '../../make-apt/index/data'
import Header from "../shared/Header";
import AptListView from '../AptListView';
import AptPreparationView from '../AptPreparationView';
import AptsTransactionHistoryView from '../AptsTransactionHistoryView';
import AptRescheduleView from '../AptRescheduleView';
import AptCheckoutView from '../AptCheckoutView';
import {
  HEADER_PROPS,
  AptList,
  AptMockData,
  AptsTransactionHistory,
  SCREENS
} from "../shared/data";
import {RESCHEDULE_FLOW_ORDER} from '../../make-apt/index/data'
import {
  MainContentWrapper,
  ViewAptsWrapper,
} from "./styled";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { selectAllAlerts } from "../../../../../redux/reducers/alertSlice"
import AlertNotificationModal from "../shared/AlertNotificationModal"
import moment from "moment"
import { useRef } from "react";

export default function ViewApts() {
  const router = useRouter();
  const { height, device } = useWindowDimensions()

  const sectionHeight = height
    - HEADER_HEIGHT
    - 2 * MAIN_BODY_PADDING_Y

  const [currentScreen, setCurrentScreen] = useState(SCREENS.LIST_VIEW);
  const [prevScreen, setPrevScreen] = useState();

  //const prevScreen = usePreviousValue(currentScreen);
  const [isOpenPreparations, setIsOpenPreparations] = useState(false);
  const [isOpenTransactionHistory, setIsOpenTransactionHistory] = useState(false);
  const [isOpenReschedule, setIsOpenReschedule] = useState(false);
  const [isOpenCheckout, setIsOpenCheckout] = useState(false);

  const [apts, setApts] = useState([]); // useState(AptList);

  const [transactionHistories, setTransactionHistories] = useState(AptsTransactionHistory);
  const [headerTitle, setHeaderTitle] = useState('All appointments');
  const [headerProps, setHeaderProps] = useState(HEADER_PROPS)
  const [selectedApt, setSelectedApt] = useState(null);
  const [numApts, setNumApts] = useState({
    regular: 0,
    preferred: 0,
    urgent: 0,
    waitlist: 0,
    missed: 0
  })
  // Options for reschedule screen
  const [startTimeEvent, setStartTimeEvent] = useState(null);
  const [calendarType, setCalendar] = useState(CALENDAR_TYPE.find(cal => cal.value === 'REGULAR'));
  const [waitList, setWaitList] = useState([]);
  const [urgentDetails, setUrgentDetail] = useState([]);
  const [pageTopTitle, setPageTopTitle] = useState('');
  const alertData = useSelector(selectAllAlerts)



  useEffect(() => {
    const loadApts = async () => {
       const data = await getAppointments({
         patientUserId: 1,
         dateRange: {},
       })
      // const data = AptMockData;
      setApts(data.map(v => 
        ({...v, alerts: alertData[v.id] ? alertData[v.id] : { general: [], prep: [] }})))                      

      console.log(data)
    }

    loadApts()   
  }, [])

  
  useEffect( () => {
    let preferred = apts.filter( v => v.aptType==='PREFERRED').length
    let urgent = apts.filter( v => v.aptType==='URGENT').length
    let waitlist = apts.filter( v => v.aptType==='WAIT_LIST').length
    //let missed = apts.filter( v => v.aptType==='MISSED').length
  
    let missedApts = apts.filter( v => moment(v.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD")))
    //console.log(missedApts.length)
        
    setNumApts({...numApts, regular: apts.length, urgent:urgent, waitlist:waitlist,missed:missedApts.length, preferred:preferred })

    //console.log(numApts)

  },[apts])

  useEffect(() => {
    if (selectedApt)
      setStartTimeEvent(new moment(new Date(selectedApt.aptDate + ' ' + selectedApt.aptTime)))
  }, [selectedApt])

  useEffect(() => {
    setHeaderProps({ ...headerProps, title: headerTitle });
  }, [headerTitle])

  // useEffect(()=>{
  //   //setPrevScreen(prevScreenRef.current);
  //   console.log("Current view = " +currentScreen)
  //   console.log("Prev View = " + prevScreen)
  // },[currentScreen])

  const onViewPreparations = (apt) => {
    setIsOpenPreparations(true);
    setCurrentScreen(SCREENS.PREPARATIONS);
    setHeaderTitle('Preparations and instructions');
    setSelectedApt(apt);
  }

  const onViewTransactionHistory = (apt) => {
    setIsOpenTransactionHistory(true);
    setCurrentScreen(SCREENS.TRANSACTION_VIEW);
    setHeaderTitle('Appointments transaction history');
    setSelectedApt(apt);
  }
  
  const handleClosePreparationView = () => {
    setIsOpenPreparations(false);
    setCurrentScreen(SCREENS.LIST_VIEW);
    setSelectedApt(null);
    setHeaderTitle('All appointments');
  }

  const handleTransactionHistoryView = () => {
    setIsOpenTransactionHistory(false);
    setCurrentScreen(SCREENS.LIST_VIEW);
    setHeaderTitle('All appointments');
    setSelectedApt(null);
  }

  const handleReschedlueApt = (apt) => {
    setCurrentScreen(SCREENS.RESCHEDULE);
    setSelectedApt(apt);
    setIsOpenReschedule(true);
    setPageTopTitle('Reschedule');
  }

  const handleCancelApt = (apt) => {
    setApts(apts.filter(v => v.id != apt.id));
  }

  const handleRescheduleAptNext = (urgData) => {    
    setUrgentDetail(urgData)
    setCurrentScreen(SCREENS.CHECKOUT);
    setIsOpenReschedule(false); 
    setIsOpenCheckout(true); 
  }

  const handleRescheduleAptCancel = () => {
    if (prevScreen ==  RESCHEDULE_FLOW_ORDER.EDIT_RESCHEDULE) {
      setCurrentScreen(SCREENS.CHECKOUT);
      setIsOpenReschedule(false); 
      setIsOpenCheckout(true); 
      setPrevScreen(0);
    } else {
      setCurrentScreen(SCREENS.LIST_VIEW);
      setIsOpenReschedule(false);
    }
  }

  const  handleCheckoutAptNext = async (finalApt, finalStartTime, urgData) => {
    // Post request
    let checkoutData = {

      alert: "",
      aptDate: finalApt.aptDate,
      aptState: finalApt.aptState,
      aptTime: finalApt.aptTime,
      aptType: finalApt.aptType,
      details: finalApt.details,
      duration: finalApt.duration,
      followUpData: finalApt.followUpData,
      id:finalApt.id,
      patientUserId: finalApt.patientUserId,
      preference: finalApt.preference,
      priority: finalApt.priority,
      providerUserFacilityName: finalApt.provider.facilityName,
      providerUserId: finalApt.providerUserId,
      reasons: finalApt.reasons,
      urgData: urgData
      // loggedUserID: 1,
      // aptID:finalApt.id,
      // aptType:finalApt.aptType,
      // aptState:finalApt.aptState,
      // providerId: finalApt.provider.id,
      // scheduledDate: finalStartTime.format("MM/DD/YYYY"),
      // scheduledTime: finalStartTime.format("hh:mm A"),
      // scheduledWeekDay: finalStartTime.format("dddd"),
      // urgentDetails: urgData
    };
    //console.log(checkoutData);
    //const checkoutRes = await checkoutAppointment(checkoutData)

    // if (checkoutRes.status) {
    //   setCurrentScreen(SCREENS.LIST_VIEW);    
    //   setIsOpenCheckout(false);
    // } 

    setCurrentScreen(SCREENS.LIST_VIEW);    
    setIsOpenCheckout(false);
  }

  const handleCheckoutAptCancel = (reschedule_flow_order,urgData) => {
    if (reschedule_flow_order ==  RESCHEDULE_FLOW_ORDER.EDIT_RESCHEDULE) {
      setUrgentDetail(urgData)
      setPrevScreen(RESCHEDULE_FLOW_ORDER.EDIT_RESCHEDULE)
    }
      setCurrentScreen(SCREENS.RESCHEDULE);
      setIsOpenCheckout(false);
      setIsOpenReschedule(true);
  }

  const handleBack = (screen) => {
    switch (screen) {
      case SCREENS.LIST_VIEW:
        router.push('/auth/login');
        break;
      case SCREENS.PREPARATIONS:
        setCurrentScreen(SCREENS.LIST_VIEW);
        break;
      case SCREENS.TRANSACTION_VIEW:
        setCurrentScreen(SCREENS.LIST_VIEW);
        break;
      case SCREENS.RESCHEDULE:
        setCurrentScreen(SCREENS.LIST_VIEW);
        break;
      case SCREENS.CHECKOUT:
        setCurrentScreen(SCREENS.RESCHEDULE);
        break;
    }
  }

  const handleMakeNewApt = (aptdata) => {
    console.log(aptdata)
    console.log('Make new APT open')
    localStorage.setItem('parentUrl','/patients/appointment/view-apts');
    router.push('/patients/appointment/make-apt-with/'+aptdata.provider.id);
  }
  const handleRepeatApt = (apt) => { 
    setCurrentScreen(SCREENS.RESCHEDULE);
    setSelectedApt(apt);
    setIsOpenReschedule(true);
    setPageTopTitle('');

    //router.push('/patients/appointment/make-apt-with/'+aptdata.provider.id);    
  }
  return (
    <ViewAptsWrapper>
      <Header {...headerProps} 
              page={currentScreen} 
              calendarType={calendarType} 
              handleBack={() => handleBack(currentScreen)} />
      <MainContentWrapper
        sectionHeight={sectionHeight}
      >
        <div className="inner-content-wrapper">
          {(device == DEVICE_TYPE.DESKTOP || currentScreen == SCREENS.LIST_VIEW) && (
            <AptListView 
              apts={apts}
              setApts={setApts}
              onViewPreparations={onViewPreparations}
              onViewTransactionHistory={onViewTransactionHistory}
              onReschedule={handleReschedlueApt}
              onCancel={handleCancelApt}
              onMakeNewApt={handleMakeNewApt}
              onRepeatApt={handleRepeatApt}
              numApts = {numApts}
            />
          )}
          {currentScreen == SCREENS.PREPARATIONS && (
            <AptPreparationView
              apt={selectedApt}
              setApt={(v) => { setSelectedApt(v); setApts(u => u.map(w => w.id == selectedApt.id ? v : w)) }}
              onClose={handleClosePreparationView}
            />
          )}
          {currentScreen == SCREENS.TRANSACTION_VIEW && (
            <AptsTransactionHistoryView
              histories={transactionHistories}
              selectedApt={selectedApt}
              onClose={handleTransactionHistoryView}
            />
          )}
          {currentScreen == SCREENS.RESCHEDULE && (
            <AptRescheduleView 
              apt={selectedApt} 
              calendarType={calendarType}
              setCalendar={setCalendar}
              startTimeEvent={startTimeEvent}
              setStartTimeEvent={setStartTimeEvent}              
              waitList={waitList}
              setWaitList={setWaitList}
              defaultUrgentData={urgentDetails}
              topTitle={pageTopTitle}
              onNext={handleRescheduleAptNext}
              onCancel={handleRescheduleAptCancel}
            />
          )}
          {currentScreen == SCREENS.CHECKOUT && (
            <AptCheckoutView 
              apt={selectedApt} 
              calendarType={calendarType}
              startTimeEvent={startTimeEvent}
              waitList={waitList}
              urgentDetails={urgentDetails}
              onNext={handleCheckoutAptNext}
              onCancel={handleCheckoutAptCancel}
            />
          )}
        </div>
        {/* <AlertNotificationModal
          isOpened={true}
          setIsOpened={() => {}}
          apt={{
            aptDate: "2022-09-23",
            aptTime: "11:15:00",
            provider: {
              fullName: "Darlene Robertson",
              specialty: "Gastroenterology"
            }
          }}
        /> */}
      </MainContentWrapper>
    </ViewAptsWrapper>
  )
}
