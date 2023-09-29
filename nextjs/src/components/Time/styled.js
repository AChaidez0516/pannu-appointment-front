import styled from "styled-components";

export const SelectTime = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: "SF Pro Text";
  background: white;
  padding: 8px 20px;
  .left {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    row-gap: 15px;
    .datetime-pick {
      display: flex;
      align-items: center;
      column-gap: 35px;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 6px;
        .label {
          font-weight: 400;
          font-size: 13px;
          line-height: 12px;
          color: #000000;
        }
      }
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn-done, .btn-add-another {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #173FD4;
      }
      .btn-cancel {
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        color: #000000;
      }
      .btn-delete {
        height: 18px;
      }
      > div {
        :hover {
          cursor: pointer;
        }
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 2px;
      .image {
        width: 22px;
        text-align: center;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;
