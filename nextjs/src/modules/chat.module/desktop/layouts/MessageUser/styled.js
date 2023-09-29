import styled from "styled-components";

export const MessageBody = styled.div`
  font-family: SF Pro Text;
  //padding: 10px 0;
  .wrapper {
    display: flex;
    column-gap: 5px;
    
    padding-left: ${props => props.left}px;
    .line {
      border-left: 3px solid #e29a9a;
    }
    .content {
      display: flex;
      width: 100%;
      flex-direction: row;
      column-gap: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
      
      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 5px;
        margin-top: 10px;
        .avatar {
          img {
            width: 35px; height: 35px;
            border-radius: 35px;
          }
        }
        .status {
          display: flex;
          column-gap: 3px;
          align-items: center;
          .urgent {
            display: flex;
            align-items: center;
            margin-top: -1px;
          }
        }
      }
      .body {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;

        .main-text {
          font-family: SF Pro Text;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          color: #000000;
          padding-right: 10px;
          line-height: 18px;
          word-break: break-all;

          ul, ol {
            margin: 5px 0;
            padding-left: 10px;
            line-height: 14px;
          }
          pre {
            border: 1px solid #999;
            border-radius: 3px;
            background-color: #eee;
            line-height: 14px;
            padding: 3px 5px;
            margin: 5px 0;
          }
        }

        .extra-buttons {
          display: flex;
          column-gap: 5px;
          margin-top: 12px;

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0; outline: 0;
            background-color: #EAC3C3;
            border-radius: 11px;
            height: 22px;
            min-width: 96px;
            padding: 10px;
            cursor: pointer;

            font-size: 10px;
            font-weight: 400;
            line-height: 10px;
            color: black;
          }
        }

        .more-link {
          color: #E29A9A;
          text-decoration: none;
        }

        .summary-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          .title {
            font-family: SF Pro Text;
            font-size: 12px;
            font-weight: 700;
            line-height: 14px;
          }

          .info {
            display: flex;
            align-items: center;

            .status {
              display: flex;
              column-gap: 10px;
              align-items: center;
              .date {
                font-size: 10px;
                font-weight: 500;
                line-height: 12px;
              }

              .date.blue {
                color: rgba(23, 63, 212, 0.5);
              }

              .read-icon {
                cursor: pointer;
              }
            }
          }

          .menu-icon {
            cursor: pointer;
            padding: 0 10px 0 5px;
            margin-left: 10px;
          }
        }

      }
    }
  }
  .wrapper.mark {
    background-color: #ECECEC;
  }
  .ref {
    display: block;
    position: relative;
    flex-direction: column;
    background: #ffffff;
    //border-left: 3px solid #e29a9a;
    //margin-left: 50px;
    margin-bottom: 10px;
    
    .show-more {
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      margin-left: -5px;
      padding-top: 7px;
      padding-bottom: 7px;
      padding-left: ${props => props.left + 50}px;
    }
  }
  .ref.more {
    margin-bottom: 40px;
  }
`