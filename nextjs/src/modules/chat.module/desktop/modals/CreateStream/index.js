import Modal from '../../../../../components/Modal'

import {
  ModalWrapper,
} from './styled'

const style = {

}

export default function CreateStream({ caption, handleCreate, handleClose }) {

  return (
    <>
      <Modal isOpened={open}>
        <ModalWrapper>
          <div className="header">
            <div className="title">{caption}</div>
          </div>
          <div className="body">
            <div className="row"><input type="text" placeholder="Input stream name" /></div>
            <div className="row"><input type="text" placeholder="Input description" /></div>
          </div>
          <div className="footer">
            <div className="btn-row">
              <button className="btn" onClick={handleClose}>Cancel</button>
              <button className="btn blue" onClick={handleCreate}>Okay</button>
            </div>
          </div>
        </ModalWrapper>

      </Modal>
    </>
  )
}
