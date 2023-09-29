import styled from "styled-components";

export const DefaultWrapper = styled.div`
  .action {
    margin: 12px 12px 6px 12px;
    background: white;
    border-radius: 9px 9px 0px 0px;
    .stop, .snooze {
      cursor: pointer;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 10px;
      text-align: center;
      color: #173FD4;
      padding: 18px;
    }
    .stop {
      border-bottom: 1px solid #BBBBBE;
    }
  }
  .settings {
    cursor: pointer;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 20px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    text-align: center;
    color: #173FD4;
  }
`;

export const SnoozeWrapper = styled.div`
  .list {
    margin: 12px 12px 6px 12px;
    background: white;
    border-radius: 9px 9px 0px 0px;
    .btn {
      cursor: pointer;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 10px;
      text-align: center;
      color: #173FD4;
      padding: 18px;
      border-bottom: 1px solid #BBBBBE;
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;
