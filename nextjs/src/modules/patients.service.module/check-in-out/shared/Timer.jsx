import { useEffect, useState } from "react"
import styled from "styled-components"
import BeatLoader from "react-spinners/BeatLoader";
import { useStopwatch } from 'react-timer-hook';
import { PlayStartIcon, PlayStopIcon } from "../../../../common/utils/Icons"
import moment from "moment";
import { padZero } from "../../../../common/utils/datetime";
export const Timer = (props) => {

  const {
    activity,
    setActivity,
    process,
    processList,
    setProcessList,
    finishActivity,
    setFinishActivity,
    setIsRunning,
  } = props

  useEffect(() => {
    reset(0, false)
  }, [activity.id])

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

  const handleStartRecord = () => {
    start()
    setIsRunning(true)
    setActivity({ ...activity, actual: [moment().format('HH:mm')] })

    if (process) {
      setProcessList(processList.map(p => p.id === process.id ? ({ ...p, start: new Date() }) : p))
    }
  }

  const handleStopRecord = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 300);
    setActivity({ ...activity, actual: [...activity.actual, moment().format('HH:mm')] })

    // calc last present of the process
    if (process) {
      setProcessList(processList.map(p => {
        if (p.id === process.id) {
          const now = moment();
          const duration = now.diff(moment(p.start), 'seconds')
          return { ...p, present: duration + (p?.present || 0) }
        }
        return p
      }))
    }
    reset(0, false)
    setIsRunning(false)
    setFinishActivity(true)
  }

  return (
    <TimerWrapper isProcess={true}>
      <InnerWrapper>
        <TimeWrapper>
          <RedColored>{padZero(hours)}</RedColored>h : <RedColored>{padZero(minutes)}</RedColored>m
        </TimeWrapper>
        <ActionBtnWrapper>
          <button disabled={isRunning || finishActivity} onClick={() => handleStartRecord()}>
            <PlayStartIcon disabled={isRunning || finishActivity} />
          </button>
          <div><BeatLoader loading={isRunning} size={11} color="#1EC510" /></div>
          <button disabled={finishActivity} onClick={() => handleStopRecord()}>
            <PlayStopIcon disabled={finishActivity} />
          </button>
        </ActionBtnWrapper>
        {props?.process && (
          <ProcessTitle color={props?.process?.color}>{props?.process?.title}</ProcessTitle>
        )}
      </InnerWrapper>
    </TimerWrapper>
  )
}
