import Modal from '../../../../../components/Modal'
import { ConfirmIcon, CloseIcon } from '../../../../../common/utils/Icons'
import {
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalFooter
} from './styled'

const ConfirmEdit = ({ onEdit, onCancel, isOpened }) => {
  return (
    <Modal isOpened={isOpened}>
      <ModalWrapper>
        <ModalHeader>
          <div className="close" onClick={onCancel}><CloseIcon /></div>
        </ModalHeader>
        <ModalBody>
          <div className="mark-wrapper">
            <ConfirmIcon />
          </div>
          <div className="content">Confirm edit</div>
        </ModalBody>
        <ModalFooter>
          <div className="btn-wrapper">
            <button className="btn green" onClick={onEdit}>Yes</button>
            <button className="btn normal" onClick={onCancel}>No</button>
          </div>
        </ModalFooter>
      </ModalWrapper>
    </Modal>
  )
}

export default ConfirmEdit