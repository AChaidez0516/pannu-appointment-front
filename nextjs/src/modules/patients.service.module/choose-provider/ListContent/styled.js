import styled from "styled-components";


export const ListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`
export const ToCompareWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  button {
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 10;
    width: 90px;
    height: 35px;
    background: rgba(250, 194, 60, 0.85);
    border-radius: 9px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
  }
`
export const CompareNotifyWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 28px;
  right: 28px;
  height: 28px;
  padding: 0 28px;
  background: #FBCB59;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  span {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
  button {
    border: none;
    margin: 0;
    outline: none;
    background-color: transparent;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 16px;
    color: #173FD4;
  }
`