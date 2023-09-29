import { useState } from 'react'
import { useStopwatch } from 'react-timer-hook';
import Image from "next/image";
import moment from 'moment';
import {
  Summary,
  Subtitle,
  SectionWrapper,
  ModalContent,
  ButtonWrapper,
  DetailsWrapper,
  RedColored,
} from "./styled";
import {
  ClockIcon,
  PlayStartIcon,
  PlayStopIcon,
} from "../../../common/utils/Icons";
import Modal from "../../../components/Modal";
import { DescriptionComponent } from "../shared/More";
import { getTimeFromApt, padZero } from '../../../common/utils/datetime';
import { ActionBtnWrapper } from '../../../components/ActionBtnWrapper';
import { ICONS } from '../../../common/utils/styleGuide';
import { mergeReasons } from '../../../common/utils/stringHandle';
import { SectionHeader } from '../shared/SectionHeader';
import { Flex } from '../../../components/buzz';
import { ThreadWrapper } from './styled';


function AppointmentDetails({
  aptDetails,
  goToFolowUp,
  isChangedApt,
  title,
  onArrowBack,
}) {

  const reasons = mergeReasons(aptDetails?.reasons) || 'no reasons'
  const preparations = mergeReasons(aptDetails?.preparations) || 'no preparations'
  const instructions = mergeReasons(aptDetails?.instructions) || 'no instructions'
  const iconColor = '#29B05A';
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
    restart,
  } = useStopwatch({ autoStart: false });

  const [modalDescription, setModalDescription] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [startRecord, setStartRecord] = useState(false)
  const [elipsedTime, setElipsedTime] = useState([0, 0]) // [min, sec] 
  const [runningClock, setRunningClock] = useState(false)

  const onClickMore = (description) => {
    setModalDescription(description);
  }

  const handleStartRecord = () => {
    start()
    setStartRecord(true)
  }

  const handlePause = () => {
    pause()
  }

  const handleStopRecord = () => {
    reset(0, false)
    setElipsedTime([minutes, seconds])
    setStartRecord(false)
    setShowTimer(false)
  }


  return (
    <div className="section">
      {showTimer && (
        <ThreadWrapper>
          <Flex x="space-between">
            <ActionBtnWrapper twoMoreBtns m={"0"}>
              {!isRunning && (
                <button onClick={() => handleStartRecord()}>
                  <PlayStartIcon />
                </button>
              )}
              {isRunning && (
                <button onClick={handlePause}>
                  <Image src={ICONS.pauseIcon} width={60} height={60} layout="fixed" />
                </button>
              )}
              <span className="time"><RedColored>{padZero(minutes)}</RedColored>m : <RedColored>{padZero(seconds)}</RedColored>s</span>
              <button disabled={!startRecord} onClick={handleStopRecord} >
                <PlayStopIcon disabled={!startRecord} />
              </button>
            </ActionBtnWrapper>
          </Flex>
        </ThreadWrapper>
      )}
      <DetailsWrapper>
        <>
          <SectionHeader
            title={title}
            onArrowBack={onArrowBack}
          />
          <Summary>
            <div className="item line1">
              <div>{aptDetails.provider.fullName}</div>
              <div>{aptDetails.provider.specialty}</div>
            </div>
            <div className="item line2">
              <div>{aptDetails.patient.fullName}</div>
              <div>{moment(aptDetails.patient.dob).format('M/D/YYYY')}</div>
              <div className="d-flex j-start">
                <span><ClockIcon color={iconColor} /></span>
                <span>&nbsp; {getTimeFromApt(aptDetails.aptDate, aptDetails.aptTime)}</span>
              </div>
              <div className="d-flex j-start">
                <Image className="duration" src="/assets/images/sand-clock.png" width="21" height="21" />
                <span>&nbsp; {aptDetails.duration} mins</span>
              </div>
            </div>
          </Summary>


          <Subtitle isChangedApt={isChangedApt}>
            Original appointment changed
          </Subtitle>

          <SectionWrapper>
            <div className="title">Reason for visit</div>
            <DescriptionComponent className="line" description={reasons} onClickMore={() => onClickMore(reasons)} maxLength={300} />
          </SectionWrapper>

          <SectionWrapper>
            <div className="title">Preparations</div>
            <DescriptionComponent className="line" description={preparations} onClickMore={() => onClickMore(preparations)} maxLength={300} />
          </SectionWrapper>

          <SectionWrapper>
            <div className="title">Instructions</div>
            <DescriptionComponent className="line" description={instructions} onClickMore={() => onClickMore(instructions)} maxLength={300} />
          </SectionWrapper>

          <SectionWrapper>
            <div className="title">Tasks</div>
            <DescriptionComponent className="line" description={aptDetails?.tasks} onClickMore={() => onClickMore(aptDetails.tasks)} maxLength={300} />
          </SectionWrapper>

          <SectionWrapper>
            <div className="title">Patients notes</div>
            <DescriptionComponent className="line" description={aptDetails?.patientNotes} onClickMore={() => onClickMore(aptDetails.patientNotes)} maxLength={300} />
          </SectionWrapper>

          <ButtonWrapper>
            <div className='start-btn' onClick={() => setShowTimer(true)}>Start</div>
            <div className='next-btn' onClick={() => goToFolowUp()}>Follow up<br />appointment</div>
          </ButtonWrapper>
        </>
        <Modal isOpened={!!modalDescription}>
          <ModalContent>
            <div>
              {modalDescription && modalDescription.split("\n").map((line, index) => (
                <p key={`line${index}`}>{line}</p>
              ))}
            </div>
            <button onClick={() => setModalDescription('')}>Okay</button>
          </ModalContent>
        </Modal>

      </DetailsWrapper>
    </div>
  )
}

export default AppointmentDetails
