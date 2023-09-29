import styled from "styled-components";

export const AptDataViewWrapper = styled.div`
  margin: 7px;
  background: white;
  padding: 8px;
`;

export const ProviderInfo = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
  .avatar {
    width: 42px;
    border-radius: 4px;
    flex; 20%;
  }
  .providerInfoContent {
    flex: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .name {
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px; /* 116.667% */
  }
  .address {
    color: #000;
    font-family: SF Pro Text;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 12px; /* 109.091% */
    letter-spacing: 0.357px;
  }
  .role {
    flex: 20%;
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    text-align: end;
    line-height: 14px; /* 116.667% */
  }
`;

export const AppointmentData = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 14px;
  border: 2px solid;
  border-radius: 8px;
  border-color: ${(props) => props.borderColor};
  padding: 8px;
  .aptDataContent {
    flex: 80%;
    .aptDataType {
      color: #0065fb;
      font-family: SF Pro Text;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 10px; /* 71.429% */
      margin-bottom: 13px;
    }
    .aptDataTime {
      display: flex;
      justify-content: space-between;
      color: #0065fb;
      font-family: SF Pro Text;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 10px; /* 83.333% */
    }
  }
  .aptDataEdit {
    flex: 20%;
    text-align: end;
    color: #173fd4;
    font-family: SF Pro Text;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px; /* 71.429% */
  }
`;

export const TermsAndCondition = styled.div`
  border-radius: 8px;
  border: 2px solid #ff00004d;
  padding: 8px;
  margin-top: 14px;
  .feesTitle {
    color: #000;
    font-family: SF Pro Text;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 12px; /* 85.714% */
  }
  .feesContent {
    margin-top: 18px;
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
  }
  .feesList {
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 13px; /* 108.333% */
    .numberedList {
      list-style-type: decimal;
      .listOption {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
      }
      .bold > div {
        font-weight: 700;
      }
    }
  }
  .deductible {
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px; /* 125% */
  }
  .agreeOption {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .agree {
      color: #000;
      font-family: SF Pro Text;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 15px; /* 125% */
      > span {
        color: #173fd4;
        font-family: SF Pro Text;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 10px;
      }
    }
  }
`;

export const CancelReschedulePolicy = styled.div`
  margin-top: 14px;
  border: 2px solid;
  border-radius: 8px;
  border-color: #2f80ed80;
  padding: 8px;
  .title {
    color: #000;
    font-family: SF Pro Text;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 10px; /* 71.429% */
  }
  .noshowfee {
    margin-top: 12px;
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px; /* 83.333% */
  }
  .cancelReschedule {
    margin-top: 7px;
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    .title {
      color: #000;
      font-family: SF Pro Text;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: 14px; /* 116.667% */
    }
  }
  .emergency {
    margin-top: 7px;
    color: #000;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
  }
`;

export const OurPolicies = styled.div`
  color: #000;
  font-family: SF Pro Text;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  .title {
    color: #173fd4;
    font-family: SF Pro Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 10px; /* 62.5% */
    margin-top: 15px;
    margin-bottom: 9px;
  }
  .content {
    > span {
      color: #000;
      font-family: SF Pro Text;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 14px; /* 100% */
    }
  }
`;
