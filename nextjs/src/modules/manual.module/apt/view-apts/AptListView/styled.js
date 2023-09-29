import styled from "styled-components";
import { devices } from "../../../../../common/constant/global";

export const AptListViewWrapper = styled.div`
  height: 100%;
  .header-desktop {
    display: none;
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    padding: 10px 0px;
  }
  @media ${devices.laptop} {
    .header-desktop {
      display: block;
    }
  }
`;

export const ProviderSearchLink = styled.div`
  padding: 0 47px;
  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #173fd4;
  }
  margin-bottom: 25px;
  text-align: center;
`;
export const TabsWrapper = styled.div`
  .apt-status-tab {
    padding: 0 14px;
    margin-bottom: 27px;
  }
  .view-type-tab {
  }
  margin-bottom: 27px;
`;
export const AptTypeWrapper = styled.div`
  padding: 0 25px;
  .all {
    text-align: center;
    button {
      font-weight: 600;
      font-size: 14px;
      line-height: 12px;
      color: #c4c4c4;
    }
    button.active {
      color: #173fd4;
    }
    margin-bottom: 33px;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: 35px;
`;

export const CalendarViewWrapper = styled.div`
  padding: 12px 0px;
  .headline {
    padding-left: 10px;
    font-family: "SF Pro Text";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
`;
