import Image from 'next/image'
import Modal from '../../../../../components/Modal'

import {
  Wrapper,
  Row,
  Label,
  Buttons,
  CancelButton,
  Button
} from './styled'

export default function Index({ open, handleClose, handleOk }) {
  return (
    <Modal isOpened={open}>
      <Wrapper>
        <Row style={{marginTop:10}}>
          <Image src="/assets/images/alert.png" width="37" height="38" />
        </Row>
        <Row>
          <Label>Are you sure you want to delete this message?</Label>
        </Row>
        <Buttons>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <Button onClick={handleOk}>Delete</Button>
        </Buttons>
      </Wrapper>
    </Modal>
  )
}
