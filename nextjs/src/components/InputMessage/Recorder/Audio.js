
import { useEffect, useRef, useState } from 'react'
import AudioCore, { RecordState } from './AudioCore'
import PropTypes from 'prop-types'
import {
  AudioRecoderWrapper
} from './styled'

import { CancelIcon, PlayIcon, RecordIcon, StopIcon } from '../../../../../common/utils/Icons'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

AudioRecorder.propTypes = {
  onCancel: PropTypes.func,
  onResult: PropTypes.func
}
function AudioRecorder({ onCancel, onResult }) {
  // const [status ,setStatus] = useState(Status.STOP)
  const { width, height } = useWindowDimensions()

  const [audioData, setAudioData] = useState(null)
  const [recordState, setRecordState] = useState(RecordState.NONE)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [impossibleRecording, setImpossibleRecording] = useState(false)

  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    setCanvasWidth(containerRef.current.clientWidth)
    setCanvasHeight(containerRef.current.clientHeight)

    //init().catch(e => console.log(e))

  }, [])

  useEffect(() => {
    setCanvasWidth(containerRef.current.clientWidth)
    setCanvasHeight(containerRef.current.clientHeight)
  }, [width, height])

  const start = () => {
    setStartTime(new Date())
    setRecordState(RecordState.START)
  }

  // const pause = () => {
  //   setRecordState(RecordState.PAUSE)
  // }

  const stop = () => {
    setRecordState(RecordState.STOP)
  }

  const onStop = (data) => {
    const curTime = new Date()
    const diffTime = Math.ceil((curTime.getTime() - startTime.getTime()) / 1000)

    setAudioData({ ...data, duration: diffTime })

    onResult({ ...data, duration: diffTime })
  }

  const onError = () => {
    setRecordState(RecordState.STOP)
    onCancel()
  }

  const play = () => {
    playerRef.current.play()
  }


  return (

      <AudioRecoderWrapper>
        <div className="container" ref={containerRef}>
          <div className="main-section">
            { (recordState == RecordState.START)&& <div className="btn" onClick={stop}><CancelIcon /></div> }
            { (recordState == RecordState.STOP || recordState == RecordState.NONE)&& <div className="btn" onClick={start}><RecordIcon /></div> }

            <AudioCore
              state={recordState}
              canvasWidth={canvasWidth - 80}
              canvasHeight={canvasHeight - 5}
              onResult={onStop}
              onError={onError}
              backgroundColor='rgb(255,255,255)'
            />
            <audio
              ref={playerRef}
              controls
              src={audioData ? audioData.url : null}
              style={{ display: 'none' }}
            ></audio>

            { (recordState == RecordState.STOP && audioData)&& <div className="btn"onClick={play}><PlayIcon /></div> }
            { (recordState == RecordState.START)&& <div className="btn" onClick={stop}><StopIcon /></div> }
          </div>
        </div>
      </AudioRecoderWrapper>
  )
}

export default AudioRecorder
