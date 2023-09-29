import styled from 'styled-components'
import { devices } from '../../../common/constant/global'

export const LoginWrapper = styled.div`
  @media ${devices.laptop} {
    max-width: 1450px;
    display: flex;
    margin: 0 auto;
    height: 100vh;
  }
`
export const TopWrapper = styled.div`
  .login-corner {
    position: fixed;
    top: 0;
    left: 0;
  }
  .header {
    padding-top: 82px;
    display: flex;
    flex-direction: column;
    row-gap: 29px;
    .title {
      text-align: center;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      color: #173FD4;
    }
    .bg-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .login-bg {
      width: 100%;
      margin: 0 auto;
      padding: 0 95px;
    }
    padding-bottom: 29px;
  }
  @media ${devices.laptop} {
    flex: 1;
    .header {
      height: 100vh;
      row-gap: 0px;
    }
    .login-corner {
       display: none;
    }
    .login-bg {
      padding: 0 0!important;
      display: flex;
      flex-direction: column;
      flex: 1;
      max-width: 567px;
    }
  }
`
export const LeftWrapper = styled.div`
  background: inherit;
  @media ${devices.laptop} {
    width: 608px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
export const NoteWrapper = styled.div`
  max-width: 475px; // 608px
  margin: 0 auto;
  padding: 0 17px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    color: #000000;
    text-align: center;
    margin-bottom: 27px;
  }
  .detail {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
  margin-bottom: 21px;
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