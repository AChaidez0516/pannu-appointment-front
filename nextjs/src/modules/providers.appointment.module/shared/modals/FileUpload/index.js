import Image from 'next/image'
import Modal from '../../../../../components/Modal'
import LinearProgress from '@mui/material/LinearProgress';

import { useState, useRef, useReducer } from 'react'

import { FILE_SERVER_URL, ResultStatus } from '../../../../../common/constant/global';
import { IMGS } from '../../../../../common/utils/styleGuide'
import { RemoveIcon } from '../../../../../common/utils/Icons'
import {
  UploadPopupWrapper
} from './styled'

const UploadStatus = {
  NOT: 0,
  PROGRESS: 1,
  END: 2
}

const fileReducer = (state, action) => {
  switch (action.type) {
    case 'add_file':
      let new_ = { ...state }
      new_[action.data.key] = action.data.attached_file
      return { ...new_ }
      break;
    case 'update_status':
      new_ = { ...state }
      new_[action.data.key].status = action.data.status
      return { ...new_ }
      break;
    case 'update_progress':
      new_ = { ...state }
      new_[action.data.key].loaded = action.data.loaded
      return { ...new_ }
      break;
  }
}
const FileUpload = ({ opened, onCancel, onResult }) => {
  const attachFileInputRef = useRef(null)
  //const [selectedFiles, setSelectedFiles] = useState({})

  const [fileState, fileDispatch] = useReducer(fileReducer, {})

  const attachFile = (e) => {
    console.log(e.target.files)

    for (let i = 0; i < e.target.files.length; i++) {
      let f = e.target.files[i]

      fileDispatch({
        type: 'add_file',
        data: {
          key: f.name,
          attached_file: {
            status: UploadStatus.NOT, file: f, loaded: 0
          }
        }
      })
    }

    /*Object.keys(selectedFiles).forEach(v => {
      const f = selectedFiles[v]
      uploadFile(f, (progressEvent) => {

      })
        .then (res => console.log(res))
        .catch(e => console.log(e))
    })

    e.target.files = []*/
  }

  const selectFile = () => {
    attachFileInputRef.current.click()

  }

  const uploadFile = async (file, callback) => {
    const formData = new FormData()

    formData.append('operations', '{"query":"mutation($file:Upload!) {singleUploadFile(file: $file){status, filename}}"}')
    formData.append('map', '{"0": ["variables.file"]}')
    formData.append('0', file)

    const config = {
      onUploadProgress: callback
    }

    const axios = (await import('axios')).default
    const res = await axios.post('https://appointment.pannucorp.com/uploads/graphql', formData, config)
    const ret = res.data.data.singleUploadFile

    if (ret.status == ResultStatus.SUCCESS)
      return `${FILE_SERVER_URL}/uploads/${ret.filename}`

    return ''
  }
  return (
    <Modal isOpened={opened}>

      <UploadPopupWrapper>
        <div className="title">Attach file</div>

        <div className="file-drag-drop">
          <input type="file" className="attach-file" ref={attachFileInputRef} multiple onChange={attachFile} />
          <Image src={IMGS.uploadBG} width={230} height={170} layout="fixed" />
        </div>
        <div className="row">
          <button className="btn upload" onClick={selectFile}>Upload</button>
        </div>
        <div className="upload-file-box">
          { Object.keys(fileState).map((s, i) => (
            <div key={i} className="one">
              <div className="info">
                <span className="name">{fileState[s].file.name}</span>
                <span className="size">{Math.ceil(fileState[s].file.size / 100) / 10}KB</span>
                <span className="func">
                  <span className="btn"><RemoveIcon /></span>
                </span>
              </div>
              <div className="progress-bar">
                <LinearProgress variant="determinate" value={Math.ceil(fileState[s].loaded / fileState[s].file.size) * 100} />
              </div>
            </div>
          )) }
        </div>

        <div className="row justify-end mt-20">
          <button className="btn link blue" onClick={selectFile}>Another Upload</button>
        </div>
        <div className="row" style={{ marginTop: 50 }}>
          <button className="btn link black" onClick={onCancel}>Cancel</button>
          <button className="btn link blue" onClick={onCancel}>Done</button>
        </div>
      </UploadPopupWrapper>
    </Modal>
  )
}

export default FileUpload