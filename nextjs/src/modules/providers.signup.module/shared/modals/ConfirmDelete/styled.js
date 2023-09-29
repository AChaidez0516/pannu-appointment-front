import styled from 'styled-components'

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  .close {
    margin-right: 17px;
    cursor: pointer;
  }
`
export const ModalWrapper = styled.div`
  height: 350px;
  width: 394px;
  border-radius: 5px;
  background-color: #FFF; 
  position: relative;
  padding-top: 20px;
`

export const ModalBody = styled.div`
  .mark-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .content {
    margin-top: 20px;
    font-family: SF Pro Display;
    font-size: 20px;
    font-weight: 200;
    line-height: 25px;
    letter-spacing: 0px;
    text-align: center;
  }
`
export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0; right: 0;
  bottom: 74px;
  .btn-wrapper {
    display: flex;
    width: 300px;
    justify-content: space-between;
  }
  .btn {
    outline: none;
    cursor: pointer;
    font-family: SF Pro Display;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: 0px;
    text-align: center;
    width: 140px; height: 62px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    &.red {
      background: #E81D3C;
      color: white;
      border: none;
    }
    &.normal {
      background: white;
      border: 1px solid #BCC8D8;
    }
  }
`