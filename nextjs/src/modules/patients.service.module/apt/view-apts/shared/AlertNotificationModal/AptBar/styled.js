import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'SF Pro Text';
  display: flex;
  column-gap: 8px;
  background: white;
  padding: 12px 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  .avatar {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    overflow: hidden;
  }
  .content {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: calc(100% - 50px);
    .flex {
      display: flex;
      justify-content: space-between;
      .name, .specialty {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
      }
    }
    .description {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 13px;
      color: #000000;
    }
    .alert {
      display: flex;
      column-gap: 24px;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 10px;
      color: #000000;
    }
  }
`
