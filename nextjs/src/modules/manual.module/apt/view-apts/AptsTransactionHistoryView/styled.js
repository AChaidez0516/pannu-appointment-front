import styled from "styled-components";
import { devices } from "../../../../../common/constant/global";

export const TransactionHistoryWrapper = styled.div`  
  .header-desktop {
    display: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    padding: 10px 0px 20px 0px;
  }
 
  @media ${devices.laptop} {
    .header-desktop {
      display: block;
    }
  }

  font-family: 'SF Pro Text';
  padding: 6px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;  

  .simplebar-content-wrapper {
    border-radius:15px;
  }
`
export const DoneBtnWrapper = styled.div`
    margin-top: 10px;
    font-weight: 500;
    font-size: 22px;
    line-height: 1px;
    color: #173FD4 !important;
    text-align: center;
    :hover {
      cursor: pointer;
    }
`
export const SummaryWrapper = styled.div`
  padding: 0px 8px;
  .headline {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    .summary {
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      text-decoration: underline;
      color: #000000;
    }
    .total {
      display: flex;
      column-gap: 5px;
      align-items: center;
      .label {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        text-decoration: underline;
        color: #000000;
      }
      .amount {
        padding-top: 2px;
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        color: #000000;
      }
    }
  }
  .content {
    display: flex;
    column-gap: 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      > div {
        display: flex;
        justify-content: space-between;
      }
      .urgent-fees, .preferred-fees, .waitlist-fees {
        padding-left: 25px;
      }
      .urgent-fees .label {
        font-weight: 600;
        color: #FF0000;
      }
      .preferred-fees .label {
        font-weight: 600;
        color: #0085FE;
      }
      .waitlist-fees .label {
        font-weight: 600;
        color: #F69E2C;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      > div {
        display: flex;
        justify-content: space-between;
      }
      .copay .label {
        font-weight: 600;
        color: #F66A29;
      }
      .deductible .label {
        font-weight: 600;
        color: #0065FB;
      }
      .coinsurance .label {
        font-weight: 600;
        color: #08B527;
      }
    }
  }
`

export const FilterWrapper = styled.div`
  padding: 0px 8px;
  .headline {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 12px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .flex {
      display: flex;
      column-gap: 10px;
      .date-from, .date-to {
        .caption {
          top: -6px;
        }
        .input-box {
          border-color: #CDCDCD;
        }
      }
    }
    .btn-show {
      font-weight: 600;
      font-size: 14px;
      line-height: 14px;
      color: #173FD4;
      :hover {
        cursor: pointer;
      }
    }
  }
`

export const ListWrapper = styled.div`
  background: #C9D3E0;
  border-radius: 15px;
  padding: 8px 6px 14px 6px;
  .headline {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 4px;
    padding: 0px 5px;
  }
  .header {
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 9px;
    padding: 6px;
    margin-bottom: 10px;
    .provider-and-date {
      flex: 8;
      .provider, .date {
        font-weight: 600;
        font-size: 10px;
        line-height: 10px;
        color: #000000;
      }
    }
    .appt-fees {
      flex: 3;
      font-weight: 600;
      font-size: 10px;
      line-height: 10px;
      color: #000000;
    }
    .categories {
      flex: 4;
      .copay, .deductible, .coinsurance, .selfpay {
        font-weight: 600;
        font-size: 10px;
        line-height: 10px;
        text-align: center;
      }
      .copay {
        color: #F66A29;
      }
      .deductible {
        color: #0065FB;
      }
      .coinsurance {
        color: #08B527;
      }
      .selfpay {
        color: #000000;
      }
    }
    .service-fees {
      flex: 4;
      font-weight: 600;
      font-size: 10px;
      line-height: 10px;
      color: #000000;
      text-align: center;
    }
    .total {
      flex: 3;
      font-weight: 600;
      font-size: 10px;
      line-height: 10px;
      color: #000000;
    }
  }
  .item {
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid;
    border-radius: 6px;
    padding: 7px 5px;
    margin-bottom: 10px;
    :last-child {
      margin-bottom: 0px;
    }
    .provider-and-date {
      position: relative;
      flex: 8;
      .providerName {
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #000000;
        margin-bottom: 5px;
      }
      .flex {
        display: flex;
        column-gap: 5px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 3px;
        }
        .date {
          padding-top: 6px;
          font-weight: 400;
          font-size: 12px;
          line-height: 12px;
          color: #000000;
        }
      }
      .icon {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%) translateX(calc(100% - 34px));
      }
    }
    .appt-fees {
      flex: 3;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      text-align: left;
      color: #333333;
    }
    .categories {
      flex: 4;
      .copay, .deductible, .coinsurance, .selfpay {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        text-align: right;
      }
      .copay {
        color: #F66A29;
      }
      .deductible {
        color: #0065FB;
      }
      .coinsurance {
        color: #08B527;
      }
      .selfpay {
        color: #333333;
      }
    }
    .service-fees {
      flex: 3;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      text-align: right;
      color: #333333;
    }
    .total {
      flex: 4;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      text-align: right;
      color: #333333;
    }
  }
  .no-history {
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #000000;
  }
`

export const PopoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 10px 5px 5px;
  width: ${props => props.width}px;
  //border: 1px solid #C4C4C4;
  //border-radius: 10px;
  
  .item {
    display: grid;
    grid-template-columns: 0.55fr 0.45fr;
    padding: 5px 0;
    .title {
      font-family: SF Pro Text;
      font-size: 10px;
      font-weight: 500;
      line-height: 10px;

      color: #000000;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    
    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: -8px; margin-right: -3px;
    }
    .mark {
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }
`
