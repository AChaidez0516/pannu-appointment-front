import styled from "styled-components";

export const ModalContent = styled.div`
`;

export const TimeslotList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-family: "SF Pro Text";
  background: ${props => props.isEditing ? "rgba(0, 0, 0, 0.36)" : "white"};
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom: 1px solid #9F9FA0;
  padding: 10px 8px;
  .no-alerts {
    height: 34px;
    padding: 6px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #000000;
  }
  .item {
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    &.selected {
      background: white;
      border: 2px solid #FF0000;
      border-radius: 5px;
    }
    .time {
      padding: 3px;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;
      color: #000000;
      width: 110px;
    }
    .alert-type {
      display: flex;
      column-gap: 15px;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 2px;
      }
    }
    .actions {
      width: 64px;
      display: flex;
      column-gap: 20px;
      .btn-edit, .btn-delete {
        height: 22px;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export const SelectTime = styled.div`
  display: flex;
  justify-content: space-between;
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
      .btn-done, .btn-add-another, .btn-add {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #C4C4C4;
        &.active {
          color: #173FD4;
        }
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
      > div.active {
        :hover {
          cursor: pointer;
        }
      }
      > div {
        :hover {
          cursor: not-allowed;
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
        filter: grayscale(100%);
        opacity: 0.5;
        :hover {
          cursor: pointer;
        }
        &.active {
          filter: none;
          opacity: 1;
        }
      }
    }
  }
`;
