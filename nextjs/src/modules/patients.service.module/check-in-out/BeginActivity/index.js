import { useEffect, useState } from "react"
import moment from "moment"
import ClockLoader from "react-spinners/ClockLoader";
import { useStopwatch } from 'react-timer-hook';
import styled from "styled-components"
import { ActionBtn, ActionBtnWrapper } from "../../../../components/ActionBtnWrapper"
import Modal from "../../../../components/Modal"
import { SectionWrapper } from "../Home/styled"
import { SelectProcessModal } from "./SelectProcessModal"
import { PlayStartIcon, PlayStopIcon } from "../../../../common/utils/Icons";
import { padZero } from "../../../../common/utils/datetime";

export const BeginActivity = ({
  activity, // selected activity
  setActivity,
  handleFinish,
  processList,
  setProcessList,
  activityProcess,
  setActivityProcess,
}) => {
  const [process, setProcess] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [processRunning, setProcessRunning] = useState(false)
  const [beginActivityTime, setBeginActivityTime] = useState(null)
  useEffect(() => {
    setProcess(null)
    setProcessRunning(false)
    setBeginActivityTime(null)
    reset(0, false)
    setActivityProcess({ ...activityProcess, duration: 0 })
  }, [activity.id])

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const handleBeginActivity = () => {
    start()
    if (!beginActivityTime) {
      setBeginActivityTime(new Date())
    }

    /** not sure the logic */
    setActivityProcess({
      ...activityProcess,
      title: activity?.name,
      start: (new Date()),
    })
    /** not sure the logic */

    if (process) {
      setProcessRunning(true)
      setProcessList(processList.map(p => p.id === process.id ? ({ ...p, start: new Date() }) : p))
    }
  }
  const handleStartProcessRecord = () => {
    reset()
    if (!process) {
      return
    }
    setProcessRunning(true)
    setProcessList(processList.map(p => p.id === process.id ? ({ ...p, start: new Date() }) : p))
  }

  const handleProcessStopRecord = () => {

    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    setProcessList(processList.map(p => {
      if (p.id === process.id) {
        const now = moment();
        const duration = now.diff(moment(p.start), 'seconds')
        return { ...p, present: duration + (p?.present || 0) }
      }
      return p
    }))
    setProcessRunning(false)
    // setProcess(null)
    pause()
  }

  const handleActivityStop = () => {
    pause()
    /** not sure the logic */
    const now = moment();
    const duration = now.diff(moment(activityProcess.start), 'seconds')
    setActivityProcess({
      ...activityProcess,
      duration: activityProcess.duration + duration,
    })
    /** not sure the logic */
  }

  const handleSelectProcess = (selProcess) => {
    setOpenModal(false)
    setProcess(selProcess)
  }


  const handleFinishActivity = () => {
    /** update actual duration of this activity */
    const actualDuration = moment().diff(moment(beginActivityTime), 'seconds') || 0
    setActivity({
      ...activity,
      duration: { ...activity.duration, actual: Math.floor(actualDuration / 60) },
      actual: [moment(beginActivityTime).format('HH:mm'), moment().format('HH:mm')]
    })
    reset(0, false)
    handleFinish()
  }

  return (
    <div className="section">
      <BeginActivityWrapper>
        <ActivityDescription>
          <div className="label">Activity: </div>
          <div className="desc"> {activity?.name} </div>
        </ActivityDescription>
        <TimerContainer>
          <TimerWrapper isProcess={true}>
            <InnerWrapper>
              <TimeWrapper>
                <RedColored>{padZero(hours)}</RedColored>h : <RedColored>{padZero(minutes)}</RedColored>m
              </TimeWrapper>
              <TimerBtnWrapper>

                {(!beginActivityTime || !process) && (
                  <button disabled={beginActivityTime && isRunning} onClick={handleBeginActivity}>
                    <PlayStartIcon disabled={beginActivityTime && isRunning} />
                  </button>
                )}
                {(beginActivityTime && process) && (
                  <button disabled={isRunning} onClick={() => handleStartProcessRecord()}>
                    <PlayStartIcon disabled={isRunning} />
                  </button>
                )}
                {/* <div>
                  <ClockLoader loading={beginActivityTime && isRunning} size={30} color="#1EC510" />
                </div> */}
                {!process && (
                  <button disabled={(!beginActivityTime || !isRunning)} onClick={() => handleActivityStop()}>
                    <PlayStopIcon disabled={(!beginActivityTime || !isRunning)} />
                  </button>
                )}
                {process && (
                  <button disabled={(!processRunning)} onClick={() => handleProcessStopRecord()}>
                    <PlayStopIcon disabled={(!processRunning)} />
                  </button>
                )}
              </TimerBtnWrapper>
              {process && (
                <ProcessTitle color={process?.color}>{process?.title}</ProcessTitle>
              )}
            </InnerWrapper>
          </TimerWrapper>
          <RecordList>
            {/* {!!activityProcess?.duration && (
              <RecordUnit>
                <div style={{ color: activityProcess.color }} >{activityProcess.title}</div>
                <div>{`${Math.floor(activityProcess.duration / 60)} minutes`}</div>
              </RecordUnit>
            )} */}
            {processList && processList.filter(p => p?.present).map((p, i) => (
              <RecordUnit key={i}>
                <div style={{ color: p.color }} >{p.title}</div>
                <div>{`${Math.floor(p.present / 60)} minutes`}</div>
              </RecordUnit>
            ))}
          </RecordList>
        </TimerContainer>
        <ActionBtnWrapper twoMoreBtns={true}>
          <ActionBtn disabled={isRunning} fontS={18} lineH={14} onClick={() => setOpenModal(true)}>Select Process</ActionBtn>
          <ActionBtn disabled={!beginActivityTime} fontS={18} lineH={14} onClick={handleFinishActivity} >Finish</ActionBtn>
        </ActionBtnWrapper>
      </BeginActivityWrapper>
      <Modal isOpened={openModal}>
        <SelectProcessModal closeModal={() => setOpenModal(false)}>
          {processList.map((process, i) => (
            <ProcessUnit
              key={i}
              color={process?.color}
              onClick={() => handleSelectProcess(process)}
            >{process?.title}</ProcessUnit>
          ))}
        </SelectProcessModal>
      </Modal>
    </div>
  )
}

export const BeginActivityWrapper = styled(SectionWrapper)`
  @media (min-width: 1024px) {
    padding: 27px 18px;
  }
`
export const ActivityDescription = styled.div`
  .label {
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    margin-bottom: 10px;
  }
  .desc {
    font-weight: 600;
    font-size: 13px;
    line-height: 13px;
  }
`
export const ProcessUnit = styled.div`
  width: 140px;
  height: 140px;
  text-align: center;
  border-radius: 50%;
  border: 7px solid  ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  line-height: 16px;
  color: ${props => props.color};
  cursor: pointer;
  transition: .2s ease-in;
  :hover {
    color: black;
  }
`
export const TimerContainer = styled.div`

`
export const RecordList = styled.div`
  margin-top: 21px;
  > div {
    font-weight: 500;
    font-size: 18px;
    line-height: 14px;
  } 
`
export const RecordUnit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const TimerWrapper = styled.div`
  width: 100%;
`
export const InnerWrapper = styled.div`
  padding: 15px 0;
  width: 286px;
  height: 165px;
  background: white;
  box-shadow: 0px 0px 8px #000000;
  border-radius: 9px;
  margin: 0 auto;
`
export const TimeWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 6px;
`
export const RedColored = styled.span`
  color: #D70000;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`
export const TimerBtnWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: .2s ease-in-out;
  > button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
  }
  button[disabled=false] svg {
    transition: .2s ease-in-out;
    :hover {
      transform: scale(1.12);
    }
  }
`
export const ProcessTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 14px;
  text-align: center;
  color: ${props => props.color || '#000000'};
`