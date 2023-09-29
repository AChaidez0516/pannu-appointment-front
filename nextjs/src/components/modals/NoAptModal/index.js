import Image from 'next/image'
import Modal from '../../Modal'

import {
  Wrapper,
  Row,
  Label,
  Buttons,
  CancelButton,
  ImageWrapper,
  Button
} from './styled'

export default function Index({ open, message, handleClose, handleOk, zIndex = 100, leftBtnText, rightBtnText}) {
  return (
    <Modal isOpened={open} zIndex={zIndex}>
      <Wrapper>
        <ImageWrapper>
          <Image src="/assets/images/alert.png" width="70" height="68" />
        </ImageWrapper>        

        <Row>
          <Label>{message}</Label>
        </Row>
        <Buttons>
          <Button onClick={handleOk}>{rightBtnText}</Button>
        </Buttons>
      </Wrapper>
    </Modal>
  )
}