import Image from 'next/image'
import Modal from '../../Modal'

import {
  Wrapper,
  Row,
  Label,
  Buttons,
  CancelButton,
  Button
} from './styled'

export default function Index({ open, message, handleClose, handleOk, zIndex = 100 }) {
  return (
    <Modal isOpened={open} zIndex={zIndex}>
      <Wrapper>
        <Row style={{marginTop:10}}>
          <Image src="/assets/images/alert.png" width="37" height="38" />
        </Row>
        <Row>
          <Label>{message}</Label>
        </Row>
        <Buttons>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <Button onClick={handleOk}>Delete</Button>
        </Buttons>
      </Wrapper>
    </Modal>
  )
}
