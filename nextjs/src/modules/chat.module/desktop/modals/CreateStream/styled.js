import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 200px;
  background-color: white;
  padding: 10px 20px;
  font-family: SF Pro Text;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .header {
    align-self: flex-start;
  }
  .body {
    align-slef: center;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .footer {
    align-self: flex-end;
  }
  .title {    
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 10px;
    color: #000000;
    margin-top: 10px;
  }
  
  INPUT {
    background: #fdfdfd;
    border: 0.1px solid #eee;
    box-sizing: border-box;
    border-radius: 7px;
    height: 30px;
    width: 100%;
    padding: 10px 10px 10px 10px;
    outline: unset;
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }

  .btn-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    column-gap: 37px;
    .btn {
      border: 0; outline: 0;
      background-color: transparent;
      cursor: pointer;
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: #000;
    }
    .btn.blue {
      color: #173FD4;
    }
  }
`