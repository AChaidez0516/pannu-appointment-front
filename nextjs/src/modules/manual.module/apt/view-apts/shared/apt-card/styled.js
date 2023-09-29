import styled from "styled-components";
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 21px 12px;
  p {
    font-family: 'SF Pro Text';
    margin: 0px 0px 19px 0px;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #000000;
  }
  button {
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    background: none;
    border: none;
    outline: none;
    :hover {
      cursor: pointer;
    }
  }
`;

export const AptCardWrapper = styled.div`
  font-family: 'SF Pro Text';
  position: relative;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #8B93A6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 7px 0px;
  
  > div {
    padding: 0px 7px;
  }

  .test-info {
    background: #FFB8B8;
    border-radius: 3px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;

    .title,
    .additional-info,
    .doctor,
    .date {
      font-weight: 500;
      font-size: 12px;
      line-height: 13px;
      color: #000000;
    }
  }
  .procedure-info {
    background: #BFD6FB;
    border-radius: 3px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;

    .title,
    .additional-info,
    .doctor,
    .date {
      font-weight: 500;
      font-size: 12px;
      line-height: 13px;
      color: #000000;
    }
  }

  /* header section in card */
  .header {
    padding-top: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      row-gap: 2px;
      div {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
      }
    }
    .middle {
      text-align: left;
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      color: #173FD4;
      :hover {
        cursor: pointer;
      }
    }
    .right {
      .save-btn {
        padding: 0;
        text-align: left;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #173FD4;
        :hover {
          cursor: pointer;
        }
      }
      .amount {
        font-weight: 500;
        font-size: 13px;
        line-height: 13px;
        color: green;
      }
      
    }
    margin-bottom: 8px;
  }
  /* body section in card */
  .body {
    display: flex;
    column-gap: 7px;
    .left {
      width: 93px;
      .poem {
        font-weight: 700;
        font-size: 12px;
        line-height: 12px;
        color: #FF0000;
        text-shadow: 0px 0px 10px #FF0000;
      }
      .avatar {
        cursor:pointer;
        position: relative;
        margin-top: 7px;
        margin-bottom: 25px;
        border-radius: 4px;
        .badge {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          width: fit-content;
          padding: 1px;
          font-weight: 500;
          font-size: 11px;
          line-height: 12px;
          color: #FFFFFF;
          background: #0085FE;
          border-radius: 4px;
        }
        .meeting-icons {
          padding:2px;
          position:absolute;
          bottom:0;
          right:0;
          background: #FFFFFF;
          border-radius: 5px;
          border: 1px solid black;
          span {
            display:flex !important;
          }
        }
      }
    }
    .right {
      flex: 1;
      .prior-auth {
        margin-top: 3px;
        display: flex;
        column-gap: 14px;
        .prior-label {
          font-weight: 600;
          font-size: 12px;
          line-height: 12px;
        }
        .prior-status {
          font-weight: 500;
          font-size: 11px;
          line-height: 12px;
          font-style: italic;
          &.pending {
            color: #E85D00;
          }
          &.success {
            color: green
          }
        }
        margin-bottom: 5px;
      }
      .reason-for-visit {
        width: 100%;
        height: 36px;
        padding: 5px 3px;
        border: 0.3px solid #8B93A6;
        border-radius: 4px;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 9px;
        span {
          width: 100%;
        }
        .btn {
          font-weight: 600;
          margin-left: 3px;
          color: #173FD4;
          :hover {
            cursor: pointer;
          }
        }
      }
      .facility {
        .label {
          font-style: italic;
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          margin-bottom: 5px;
        }
        .facility-detail {
          display: flex;
          align-items: center;
          column-gap: 15px;
          justify-content: space-between;
          text-decoration: none;
          .name {
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            letter-spacing: 0.357px;
          }
          .location-icon {
            cursor: pointer;
          }
        }
      }
    }
  }
  /* activities section in card */
  .activities {
    height: 40px;
    display: flex;
    align-items: flex-start;
    column-gap: 7px;
    .meeting {
      .date-time {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
      }
      .join-btn {
        margin-left: 7px;
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #173FD4;
        :hover {
          cursor: pointer;
        }
      }
    }
    .action {
      flex: 1;
      .check-in-arrival {
        text-align: center;
        padding: 0;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
      }
    }
  }
  /* bottom section in card */
  .bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .btn-unit {
      flex: 1;
    }
    .btn-label {
      font-weight: 500;
      font-size: 12px;
      line-height: 10px;
      color: #173FD4;
    }
    padding-bottom: 7px;
  }
`
export const Blue_Dot = styled.div`
  position: absolute;
  background: #173fd4;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -7px;
  left: -7px;
`
export const Red_Dot = styled(Blue_Dot)`
  background: #ff0000;
`
export const Orient_Dot = styled(Blue_Dot)`
  background: #fac23c;
`

export const AptBackgroundWrapper = styled.div`
  background-image:  
`