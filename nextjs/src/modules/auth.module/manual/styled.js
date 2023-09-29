import styled from 'styled-components'
import { IMaskInput } from 'react-imask'
import { devices } from '../../../common/constant/global'

export const LoginWrapper = styled.div`
  * {
    font-family: SF Pro Text;
    font-style: normal;
  }
  display: block;
  &.center {
    justify-content: center;
  }
  height: 100vh;
  width: 375px;
  max-width: 1310px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`


export const TopWrapper = styled.div`
  .login-corner {    
    position: absolute;

    img:first-child {
      position: absolute;
      left: 0;
    }
  }
  .header {
    margin-top: 30px;
    .title {
      margin-right: 24px;
      text-align: right;
      
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 600;
      font-size: 36px; 

      line-height: 56px;
      color: #173FD4;
    }
    .bg-wrapper {
      display: flex;
      align-items: center;
    }
    .login-bg {
      width: 100%;
      margin: 0 auto;
      padding: 0 95px;
    }
  }
`
export const LeftWrapper = styled.div`
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  padding: 0 12px;
`
export const NoteWrapper = styled.div`
  margin: 14px auto 13px auto;
  .title {
    font-family: 'SF Pro Text';
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px;
    color: #000000;
    text-align: center;
  }
`

export const ProviderInfoWrapper = styled.div`
  display: flex;
  column-gap: 21px;
  align-items: flex-start;
  margin-bottom: 14px;
  .img-wrapper {
      position: relative;
      img{
        border-radius: 5px;
      }
  }
  .right {
    flex: 1;
    .header-title {
      display: flex;
      flex-direction: column;
      margin-bottom: 17px;
      .name {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 2px;
      }
      .specialty {
        display: flex;
        padding: 0 10px;
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        /* max-width: 84px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; */
      }
    }
    .body {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .facility {
        font-weight: 500;
        font-size: 12px;
        line-height: 10px;
        font-style: italic;
        margin-bottom: 5px;
      }
      .address {
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: 0.357px;
        max-width: 216px;
      }
    }
  }
  @media ${devices.laptopM} {
    .img-wrapper {
      padding: 0 0!important;
      display: flex;
      flex-direction: column;
      max-width: 567px;
    }
  }
`

export const AnnouncementWrapper = styled.div`
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-item: flex-start;
`

export const AppointmentInformationWrapper = styled.div`
  max-width: 360px; // 608px
  display: flex;
  flex-direction: column;
`

export const CenteredRow = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 28px; 
  margin-bottom: 56px;
`

export const LinkButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #173fd4;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  &.cl-black {
    color: black;
  }
  &.cl-gray {
    color: rgba(0, 0, 0, 0.36);
  }
  &.small {
    font-size: 14px;
    line-height: 14px;
  }
  &.smallest {
    font-size: 10px;
    line-height: 10px;
  }
  &.normal {
    font-size: 16px;
    line-height: 16px;
  }
  &.middle {
    font-size: 18px;
    line-height: 18px;
  }
  &.big {
    font-size: 22px;
    line-height: 22px;
  }
  &.strong {
    font-weight: 600;
  }
`


export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-center {
    align-items: center;
  }
  margin-top: ${props => props.marginTop}px;
`

export const Input = styled.input`
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  font-weight: 600;
  
  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const Caption = styled.div`
  font-family: SF Pro Text;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px; 
  margin-bottom: 14px;
  word-wrap: break-word;
`

export const InputFieldLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 3px;
  background: white;
  padding: 5px;
  z-index: 10;
  
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  color: #000000;
`

export const InputDiv = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0px 0 0px;
  justify-content: space-between;
  font-family: SF Pro Text;
  .err-msg {
    display: none;    
    font-size: 12px;
    font-weight: 600;
    line-height: 12px;
    color: red;
    margin-top: 3px;
  }
  &.required input, &.required select {
    border-color: red;
  }
  &.required > .err-msg {
    display: block;
  }
  &.column {
    flex-direction: column;
  }
`

export const MaskInput = styled(IMaskInput)`
  border: 0.5px solid #5a585d!important;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px!important;
  font-size: 14px;
  font-weight: 600;
  margin-top: 7px;
  
  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const SocialBtnWrapper = styled.div`
  width: 243px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 18px;

  .social-btn {
    outline: none ;
    background: #FFFFFF;
    border: 0.3px solid rgba(0, 0, 0, 0.36);
    box-shadow: 0px 5px 6px 0px rgba(0,0,0,0.25);
    border-radius: 5px;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    .btn-text {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }
  .facebook-btn {
    background: #4267B2;
    & > * {
      color: white !important;;
    }
  }
  margin-bottom: 27px;
`
export const PannuLoginWrapper = styled.div`
  max-width: 475px;
  margin: 0 auto;
  padding: 0 19px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  .login-option {
    padding: 0 28px;
    .title {
      margin-bottom: 11px;
    }
    .option-group {
      display: flex;
      justify-content: space-between;
      .option-unit {
        display: flex;
        align-items: center;
        column-gap: 8px;
        input {
          margin: 0;
        }
        label {
          margin-bottom: 0;
        }
      }
    }
    margin-bottom: 32px;
  }
  @media(min-width: 1024px) {
    .login-option {
      padding: 0;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 34px;
    .form-group {
      display: flex;
      align-items: center;
      column-gap: 12px;
      // InputGroupWrapper
      .label {
        cursor: pointer;
        a {
          text-decoration: none;
          color: #173FD4;
        }
      }
    }
    .submit-btn {
      text-align: center;
      button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 600;
        font-size: 22px;
        line-height: 22px;
        color: #173FD4;
      }
    }
    .error {
      color: red;
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 600;
      margin-top: -24px;
    }
    margin-bottom: 27px;
  }
`

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 27px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  .bio {
    font-size: 22px;
    line-height: 13px;
    text-align: center;
    color: #173FD4;
  }
  .signup {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    font-weight: 600;
    font-size: 16px;
    line-height: 13px;
    color: #000000;
    .link {
      color: #173FD4;
    }
  }
  .pvd-search {
    font-size: 14px;
    line-height: 13px;
    color: #173FD4;
    text-align: center;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    button {
      color: #173FD4;
    }
  }
  a {
    text-decoration: none;
    color: #173FD4;
  }
  margin-bottom: 30px;
`