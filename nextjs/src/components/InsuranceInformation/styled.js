import styled from "styled-components";

export const InfoWrapper = styled.div`
  margin-top: 16px;
  .title {
    color: black;
    font-size: 14px;
    font-family: SF Pro Text;
    font-weight: 600;
    line-height: 12px;
    word-wrap: break-word;
    margin-left: 4px;
  }
  .content {
    margin-top: 12px;
    color: black;
    font-size: 13px;
    font-family: SF Pro Text;
    font-weight: 600;
    line-height: 12px;
    word-wrap: break-word;
  }
  .editWrapper {
    display: flex;
    margin-top: 31px;
    margin-bottom: 38px;
    justify-content: space-between;
    .message {
      color: black;
      font-size: 12px;
      font-family: SF Pro Text;
      font-weight: 500;
      line-height: 14px;
      word-wrap: break-word;
    }
    .editBtn {
      color: #173fd4;
      font-size: 14px;
      font-family: SF Pro Text;
      font-weight: 500;
      line-height: 14px;
      word-wrap: break-word;
    }
  }
`;
