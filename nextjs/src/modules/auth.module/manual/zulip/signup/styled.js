import styled from 'styled-components'
import { devices } from '../../../../../common/constant/global'

export const SignupWrapper = styled.div`
  max-width: 375px;
  @media ${devices.laptopM} {
    background-color: #fff;
    height: 100vh;
  }
  margin: auto;
  * {
    font-family: SF Pro Text;
    font-style: normal;
  }
  background-color; #fff
  .bg-section {
    position: relative;
    .img-wrapper {
      position: absolute;
    }
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    line-height: 56px;  
    color: #173FD4; 
    text-align: center;
  }

  .signup-bg {
    display: flex;
    position: relative;
    justify-content: center;
    margin-top: 20px;
  }

  .content {
    margin: 0 auto;
    max-width: 355px;

    .sub-title {
      margin-top: 27px;
      font-family: SF Pro Text;
      font-size: 22px;
      font-weight: 600;
      line-height: 22px;
      color: black;
      text-align: center;
    }
  
    .desc {
      margin-top: 14px;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      color: black;
    }
    .bigger-desc{
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 14px; 
      margin: 13px 0;
    }
    
    .options {
      display: flex;
      justify-content: flex-start;

      .one {
        margin-top: 15px;
        margin-right: 25px;
        align-items: center;
        display: flex;
        .txt {
          margin-left: 5px;
          font-family: SF Pro Text;
          font-size: 12px;
          font-weight: 600;
          line-height: 10px;
        }
      }
      
    }

    .credential {
      display: flex;
      flex-direction: column;

      .username {
        display: flex;
        margin-top: 20px;

        .suggestion {
          font-size: 10px;
          font-weight: 600;
          line-height: 16px;
          margin: 15px 0 0 10px;
          .title {
            color: #173FD4;
          }

          ul {
            color: black;
            list-style: none;
            padding: 0px;
            margin: 0px;
          }
        }
      }
      }
    }

    .password {
        display: flex;
        margin-top: 27px;

        .group {
          position: relative;
          
          .mark {
            display: flex;
            position: absolute;
            width: 100%;
            justify-content: flex-start;
            left: 5px; top: 27px; 
            align-items: center;

            .seg {
              padding-left:5px;
              padding-right: 5px;
              padding-top:4px;
              background-color: red;
              border-radius: 2px;
              margin-left: 5px;
            }

            .label {
              font-size: 9px;
              font-weight: 600;
              line-height: 13px;
              letter-spacing: 0px;
              text-align: left;
              color: red;
              margin-left: 10px;
            }
          }
        }

        .help {
          margin-left: 20px; 
          align-self: center;
        }

    .go-sigin {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      
      .text {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 13px;
        color: #000000;
        justify-content: center;
        margin-top: 2px;
      }
    }
  }

`
