import Popover from '@mui/material/Popover'

import {
  VideoPopupWrapper,
  DevicesPopupWrapper
} from './styled'
import {
  CancelIcon,
  ExchangeIcon_1,
  GalleryIcon, PlayIcon,
  RecordIcon,
  StopIcon
} from '../../../../../common/utils/Icons'
import { useState, useRef } from 'react';

const Status = {
  START : 1,
  RECORDING: 2,
  FINISH: 3,
  PLAY: 4,
}

const VideoRecorder = ({ opened, anchorEl, onClose }) => {
  const [status ,setStatus] = useState(Status.START)
  const [devicePopupOptions, setDevicePopupOptions] = useState({ opened: false })
  const [availableDevices, setAvailableDevices] = useState([
    { id: 1, name: 'Camera 1' },
    { id: 2, name: 'Camera 2' },
    { id: 3, name: 'Camera 3' },
    { id: 4, name: 'Camera 4' },
    { id: 5, name: 'Camera 5' },
    { id: 6, name: 'Camera 6' },
  ])
  const videoAttachFile = useRef(null)
  const devicesButton = useRef(null)

  const selectVideoFile = () => {
    videoAttachFile.current.click()
  }

  const attachVideo = (e) => {
    console.log(e.files)
  }
  return (
    <Popover
      open={opened}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      style={{ marginTop: 10 }}
    >
      <VideoPopupWrapper>
        <div className="video-row">
          <div className="capture-screen">

          </div>
        </div>
        <div className="btn-row">
          <div className="col">
          <div className="btn" onClick={selectVideoFile}>
            <GalleryIcon width={32} height={32} />
            <input type="file" className="attach-file" ref={videoAttachFile} name="file-image" accept=".avi, .mp4 | video *" onChange={attachVideo} />
          </div>
          </div>
          <div className="col justify-center">
            { status == Status.START&&<div className="btn" onClick={ () => setStatus(Status.RECORDING) }><RecordIcon width={35} height={35} /></div> }
            { (status == Status.FINISH || status == Status.RECORDING)&&<div className="btn" onClick={ () => setStatus(Status.START) }><CancelIcon width={35} height={35}/></div> }
            { (status == Status.RECORDING || status == Status.PLAY)&&<div className="btn" onClick={ () => setStatus(Status.FINISH) }><StopIcon width={35} height={35}/></div> }
            { status == Status.FINISH&& <div className="btn"onClick={ () => setStatus(Status.PLAY) }><PlayIcon width={35} height={35}/></div> }
          </div>
          <div className="col justify-end">
            <div className="btn" ref={devicesButton} onClick={ () => setDevicePopupOptions({ opened: true }) }><ExchangeIcon_1 width={39} height={39} /></div>
          </div>
        </div>
      </VideoPopupWrapper>
      <Popover
        open={devicePopupOptions.opened}
        anchorEl={devicesButton.current}
        onClose={ () => setDevicePopupOptions({ opened: false }) }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <DevicesPopupWrapper>
          { availableDevices.map(device => <div className="item" key={device.id}>
            {device.name}
          </div>)  }
        </DevicesPopupWrapper>
      </Popover>
    </Popover>
  )
}

export default VideoRecorder