import Modal from '../../../../../components/Modal'
import { TrashIcon, CloseIcon } from '../../../../../common/utils/Icons'
import {
  ModalWrapper,
  ModalHeader,
  ModalBody,
  ModalFooter
} from './styled'

const ConfirmDelete = ({ onRemove, onCancel, isOpened }) => {
  return (
    <Modal isOpened={isOpened}>
      <ModalWrapper>
        <ModalHeader>
          <div className="close" onClick={onCancel}><CloseIcon /></div>
        </ModalHeader>
        <ModalBody>
          <div className="mark-wrapper">
            <TrashIcon />
          </div>
          <div className="content">Confirm delete</div>
        </ModalBody>
        <ModalFooter>
          <div className="btn-wrapper">
            <button className="btn red" onClick={onRemove}>Delete</button>
            <button className="btn normal" onClick={onCancel}>No</button>
          </div>
        </ModalFooter>
      </ModalWrapper>
    </Modal>
  )
}

export default ConfirmDelete