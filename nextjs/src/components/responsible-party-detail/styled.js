import styled from "styled-components";

export const FRPartyDetailWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
  }
  svg {
    cursor: pointer;
  }
  margin-top: 20px;
  padding: 0 10px;
  .detail-info {
    .title {
      margin-bottom: 13px;
      font-weight: 600;
      font-size: 13px;
      line-height: 14px;
    }
    .contentEmpty {
      display: flex;
      align-items: center;
      column-gap: 6px;
      justify-content: center;
      color: red;
      font-weight: 600;
      font-size: 13px;
      line-height: 14px;
    }
    .content {
      display: flex;
      align-items: center;
      column-gap: 6px;
      .avatar {
        img {
          border-radius: 50%;
        }
      }
      .detail-action {
        flex: 1;
        display: flex;
        align-items: center;
        column-gap: 40px;
        .detail {
          flex: 1;
          div {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
          }
          .name {
            margin-bottom: 4px;
          }
        }
        .action {
          display: flex;
          align-items: center;
          column-gap: 34px;
        }
      }
    }
  }

  .contact-section {
    margin-top: 30px;
    .desc {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      color: #000000;
      margin-bottom: 20px;
    }
  }

  .invite-btn {
    margin-top: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
    }
    button:first-child {
      color: #000000;
    }
    button:last-child {
      color: #173FD4;
    }
  }
  
`