import styled from 'styled-components'

export const ForwardBoxWrapper = styled.div`
  .forwarded-message-box {
    display: flex;
    align-items: center;
    column-gap: 8px;
    align-items: flex-start;
    .label {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #5a585d;
      margin-right: 5px;
    }

    .mark {
      position: relative;
      margin-top: 5px;
      margin-left: 10px;
      .icon {

      }
      .num {
        position: absolute;
        left: -10px;
        top: -5px;

        font-family: SF Pro Text;
        font-size: 10px;
        font-weight: 500;
        line-height: 12px;
      }
    }
    .avatar {
      img {
        width: 25px; height: 25px;
        border-radius: 25px;
      }
    }
    .message {
      flex: 1 0 0;
      .name {
        font-size: 11px;
        font-weight: 500;
        line-height: 13px;
        color: black;
      }
      .content {
        margin-top: 3px;
        font-size: 11px;
        font-weight: 500;
        line-height: 13px;
        color: #666;
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
    }
  }

  .tag-box {
    position: relative;
    .label {
      flex: 0 0 70px;
    }
    .container {
      display: flex;
      column-gap: 10px;
      row-gap: 10px;
      flex-wrap: wrap;
      
      .tag {
        display: flex;
        align-items: center;
        column-gap: 5px;
        padding: 4px;

        border: 1px solid #173FD4;
        border-radius: 6px;

        font-size: 9px;
        font-weight: 400;
        line-height: 11px;
        color: #5A585D;

        .icon {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      }
      
      .more {
        position: absolute;
        right: 0; top: 50%;
        transform: translateY(-50%);
        font-family: SF Pro Text;
        font-size: 12px;
        font-weight: 600;
        line-height: 14px;
        color: #173FD4
      }
    }
  }
  
  .divider {
    box-sizing: border-box;
    border-top: 0.5px solid #eac3c3;
    flex: 1;
    margin: 5px 0;
  }
`
