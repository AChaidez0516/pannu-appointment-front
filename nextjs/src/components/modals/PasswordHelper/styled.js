import styled from "styled-components";

export const Wrapper = styled.div`
  background: white;
  border-radius: 21px 21px 0 0;
  position: absolute;
  padding: 16px 28px 26px 16px;
  left: 0px;
  right: 0px;
  z-index: 20;
  bottom: 0px;
  font-family: SF Pro Text;
  
  .header {
    display: flex;
    justify-content: flex-end;
    .close {
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      line-height: 14px;
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    .txt {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 13px;
    .btn {
      cursor: pointer;
      font-size: 22px;
      font-weight: 500;
      line-height: 22px;
      color: #173FD4;
      border: 0; outline: 0;
      background-color: transparent;
    }
  }
`