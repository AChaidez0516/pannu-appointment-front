import { useState, useEffect } from 'react'
import StepTwoComponent from "../../make-apt/step-2/StepTwoComponent";
import { AptCheckoutViewWrapper, FooterWrapper } from './styled'

import {
    fakePastReasons,
    fakeAllReasons,
    fakeNewReasons,
    regularEvents,
    WEEK_BUSY_TIMES,
    APTTYPE,
    APT_KINDS,
    INIT_URGENT_DETAIL,
    CALENDAR_TYPE,
    HEADER_PROPS,
    PAYMENT_CARD_LIST,
    paymentCardsReducer,
    APT_FORM_INIT,
    aptFormReducer,
    RESCHEDULE_FLOW_ORDER
} from '../../make-apt/index/data'

const busyTimesProps = {
    busyTimes: WEEK_BUSY_TIMES.filter(w => w?.isBusy),
    lessBusyTimes: WEEK_BUSY_TIMES.filter(w => !w?.isBusy),
    closedTimes: WEEK_BUSY_TIMES.filter(w => w?.isClosed)
}

export default function AptCheckoutView(props) {
    const {
        apt,
        calendarType,
        startTimeEvent,
        waitList,
        urgentDetails,
        onCancel,
        onNext
    } = props;

    const provider = { fullName: 'Darlene Robertson', specialty: 'Neurosurgeon', facility: '6513 Dogwood Ave undefined Syracuse, Alaska 62927 United States' };
    const [isFirstAptToDoctor, setIsFirstAptToDoctor] = useState(false);
    const [previousReasonsToSelect, setPreviousReasonsToSelect] = useState([]);
    const [newReasonsToSelect, setNewReasonsToSelect] = useState([]);
    const [selectedReasons, setSelectedReasons] = useState([]);
    const [exitPastReasons, setExitPastReasons] = useState(true);
    const [isDoneSelectReasons, setIsDoneSelectReasons] = useState(false);
    const [detailReason, setDetailReason] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [usePoem, setUsePoem] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setPreviousReasonsToSelect(fakePastReasons
            .map(reason => ({ ...reason, checked: (reason?.isDisableChange ? true : false) })))
      
        setNewReasonsToSelect(fakeNewReasons
        .map(reason => ({ ...reason, checked: false })));

        setSelectedReasons(fakePastReasons.filter(reason => reason.id <= 3).map(reason => ({...reason, checked: true})));
    }, []);
    
    const setCurrentStepNumber = () => {        
        onCancel(RESCHEDULE_FLOW_ORDER.EDIT_RESCHEDULE,urgentDetails);
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
    
    const bookedAptInfoComponentProps = {
        calendarType,
        setCurrentStepNumber,
        startTimeEvent,
        waitList,
        urgentDetails
    }
    return (
        <div className="section" style={{ position: "relative" }}>
            <AptCheckoutViewWrapper>
                <div className="header-desktop">Reschedule</div>
                <StepTwoComponent
                    provider={apt.provider}
                    reasonListComponentProps={reasonListComponentProps}
                    detailReason={detailReason}
                    setDetailReason={setDetailReason}
                    bookedAptInfoComponentProps={bookedAptInfoComponentProps}
                    calendarType={calendarType}
                    usePoem={usePoem}
                    setUsePoem={setUsePoem}
                    agreeTerms={agreeTerms}
                    setAgreeTerms={setAgreeTerms}
                    isSubmit={isSubmit}
                    isReschedule={true}
                />
                <FooterWrapper>
                    <div className="btn btn-cancel">
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                    <div className="btn btn-next">
                        <button onClick={() => onNext(apt,startTimeEvent,urgentDetails)} disabled={agreeTerms ? false : true}>Check out</button>
                    </div>
                </FooterWrapper>
            </AptCheckoutViewWrapper>
        </div>
    )
}
