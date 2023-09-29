import styled from "styled-components";
import { devices } from "../../../../../common/constant/global";

export const PreparationViewWrapper = styled.div`
  .header-desktop {
    display: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    padding: 10px 0px 30px 0px;
  }
  @media ${devices.laptop} {
    .header-desktop {
      display: block;
    }
  }

  padding: 0px 12px;
  .provider-info {
    display: flex;
    column-gap: 8px;
    .avatar {
      position: relative;
      border-radius: 5px;
      width: 40px;
      height: 40px;
      .top-ribbon, .bottom-ribbon {
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 12px;
        color: #FFFFFF;
        border-radius: 3px;
        z-index: 10;
        width: 30px;
        text-align: center;
      }
      .top-ribbon {
        position: absolute;
        top: -8px;
        left: 0px;
        background: #29B05A;
        background: #0085FE;
        padding: 1px;
      }
      .bottom-ribbon {
        position: absolute;
        bottom: -8px;
        left: 0px;
        background: #0085FE;
        padding: 1px;
      }
    }
    .detail {
      width: calc(100% - 48px);
      .name, .specialty {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
        margin-bottom: 5px;
      }
      .address {
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
        margin-bottom: 10px;
      }
      .apt-date {
        display: flex;
        column-gap: 15px;
        .month-day, .time {
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
          color: #000000;
          i {
            font-weight: 500;
            font-size: 12px;
            line-height: 14px;
            color: #000000;
            font-style: italic;
          }
        }
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    row-gap: 25px;
    margin-top: 40px;
    .item {
      .description {
        font-weight: 500;
        font-size: 12px;
        line-height: 13px;
        color: #000000;
        margin-bottom: 8px;
      }
      .apt-date {
        display: flex;
        justify-content: space-between;
        .month-day, .time, .btn-set-alert {
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          color: #000000;
          i {
            font-style: italic;
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            color: #000000;
          }
        }
        .btn-set-alert {
          color: #173FD4;
          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }
  .attachments {
    margin-top: 30px;
    .headline {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #000000;
      margin-bottom: 15px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      .img-info {
        display: flex;
        column-gap: 20px;
        align-items: center;
        .img {
          width: 30px;
          height: 32px;
        }
        .filename {
          font-weight: 500;
          font-size: 12px;
          line-height: 12px;
          color: #000000;
        }
      }
      .btn-more {
        padding-right: 8px;
        :hover {
          cursor: pointer;
        }
      }
    }
  }
  .btn-done {
    margin-top: 50px;
    font-weight: 500;
    font-size: 22px;
    line-height: 12px;
    color: #173FD4;
    text-align: center;
    :hover {
      cursor: pointer;
    }
  }
`

export const AttachmentActionModal = styled.div`
  background: white;
  margin: 0px 9px 5px 9px;
  border-radius: 9px 9px 0px 0px;
  > div {
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    color: #173FD4;
    border-bottom: 1px solid #BBBBBE;
    padding: 15px 0px;
    :last-child {
      border-bottom: none;
    }
    :hover {
      cursor: pointer;
    }
  }
`
