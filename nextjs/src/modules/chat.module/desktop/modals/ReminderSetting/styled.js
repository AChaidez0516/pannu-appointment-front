import styled from 'styled-components'

export const ReminderSettingWrapper = styled.div`
  width: 245px;
  background-color: white;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 19px 17px 24px 20px;
  font-family: SF Pro Text;
  .row {
    display: flex;
    align-items: center;
    column-gap: 5px;
    
    .input-wrapper {
      border: 0.5px solid #5A585D50;
      border-radius: 8px;
      position: relative;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        right: 5px;
        cursor: pointer;
      }
      .input-label {
        position: absolute;
        background-color: white;
        left: 5px; top: -7px;
        padding: 0px 5px;

        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        
      }
    }

    .input-wrapper.required {
      border-color: red;
      .input-label {
        color: red;
      }
    }
    
    .check-label {
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0px;
      text-align: right;
    }

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
  .row.justify-end {
    justify-content: flex-end;
  }
  .row.btn-group {
    column-gap: 40px;
    margin-top: 5px;
  }
`
export const Input = styled.input`
  border: 0; outline: 0;
  width: ${props => props.width}px;
  height: 50px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  color: #5A585D!important;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
export const PopupWrapper = styled.div`
  padding: 10px;
`