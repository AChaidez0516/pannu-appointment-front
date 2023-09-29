import Image from 'next/image'

import { useState } from 'react'

import {
  ScanIDWrapper,
} from './styled'


function ScanID({changedFile}) {
  const [frontFile, setFrontFile] = useState()
  const [backFile, setBackFile] = useState()

  function onFileChanged(event) {
    const name = event.target.name
    const fileData = event.target.files[0]

    if (!fileData)
      return

    changedFile(fileData, name)

    if (name == 'back_file') {
      const reader = new FileReader()
      reader.onload = (r) => {
        setBackFile(r.target.result)
      }
      reader.readAsDataURL(fileData)
    }
    else {
      const reader = new FileReader()
      reader.onload = (r) => {
        setFrontFile(r.target.result)
      }
      reader.readAsDataURL(fileData)

    }
  }

  return (
      <>
        <ScanIDWrapper>
          <div className="card-wrapper">
            <div className="wrapper">
              { (!backFile)&& (
                  <div className="card-container">
                    <Image src="/assets/images/fromPhoto.png" width="35" height="35" />
                    <input type="file" name="back_file" className="left" accept="image/*" onChange={onFileChanged} />
                    <p className="desc">Back</p>
                    <Image src="/assets/images/fromCamera.png" width="35" height="35" />
                    <input type="file" name="back_file" className="right" accept="image/*" onChange={onFileChanged} capture="user" />
                  </div>
              ) }
              { (backFile)&& (
                  <div className="preview">
                    <img src={backFile} />
                    <button className="btn" onClick={() => setBackFile(null)}>Delete</button>
                  </div>
              ) }
            </div>
          </div>
        </ScanIDWrapper>
        <ScanIDWrapper>
          <div className="card-wrapper">
            <div className="wrapper">
              { (!frontFile)&& (
                  <div className="card-container">
                    <Image src="/assets/images/fromPhoto.png" width="35" height="35" />
                    <input className="left" type="file" name="front_file" accept="image/*" onChange={onFileChanged} />
                    <p className="desc">Front</p>
                    <Image src="/assets/images/fromCamera.png" width="35" height="35" />
                    <input className="right" type="file" name="front_file" accept="image/*" onChange={onFileChanged} capture="user" />
                  </div>
              ) }
              { (frontFile)&& (
                  <div className="preview">
                    <img src={frontFile} />
                    <button className="btn"onClick={() => setFrontFile(null)}>Delete</button>
                  </div>
              ) }
            </div>
          </div>
        </ScanIDWrapper>
      </>
  )
}

export default ScanID
