import styled from 'styled-components'
import { devices } from '../../../../../common/constant/global'

export const LoginWrapper = styled.div`
  max-width: 375px;
  background-color: #fff;
  margin: auto;
  height: 100vh;
`
export const TopWrapper = styled.div`
  .header {
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
`
export const LeftWrapper = styled.div`
  background: inherit;
`
export const NoteWrapper = styled.div`
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
  }
  .text {
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px;
    margin-top: 20px;
    margin-bottom: 44px;
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
        margin-bottom: 57px;
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