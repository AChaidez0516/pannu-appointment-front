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
import LoadingButton from '../../Button/LoadingButton'

export default function Index({ open, message, handleClose, handleOk, zIndex = 100, leftBtnText, rightBtnText, isLoading}) {
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
          <CancelButton onClick={handleClose}>{leftBtnText}</CancelButton>
          <LoadingButton isLoading={isLoading}>
            <Button onClick={handleOk}>{rightBtnText}</Button>
          </LoadingButton>
        </Buttons>
      </Wrapper>
    </Modal>
  )
}
