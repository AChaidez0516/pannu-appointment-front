import Image from 'next/image'
import * as React from 'react'
import Modal from '../../../../../components/Modal'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  width: 293px;
  height: 177px;
  position: absolute;
  top: 45%;
  left: calc(50% - 147px);
  padding: 10px;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  marginTop: ${props => props.marginTop}px;
`
const Label = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #f00001;
  margin-left: 10px;
`
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 5px;
  margin-top: 20px;
`
const Button = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #173fd4;
  margin-left: 10px;
  cursor: pointer;
`
const CancelButton = styled(Button)`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  cursor: pointer;
`
export default function ConfirmDelete({ 
    isOpened,
    message, 
    onCancel,
    onRemove }) {
  return (
    <Modal
      isOpened={isOpened}
    >
      <Wrapper>
        <Row marginTop={10}>
            <Image src="/assets/images/alert.png" width="70" height="68" />
        </Row>
        <Row>
            <Label>{message}</Label>
        </Row>
        <Buttons>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <Button onClick={onRemove}>Delete</Button>
        </Buttons>
      </Wrapper>
    </Modal>
  )
}
