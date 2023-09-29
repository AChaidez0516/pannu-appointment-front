import styled, { css } from "styled-components";
import { devices } from "../../../../../common/constant/global";


export const ViewAptsWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
    font-weight: 400;
  }
`
export const MainContentWrapper = styled.div`
  background: white;
  padding: 18px 0;
  .inner-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 20px;
    .section {
      margin: 0 auto;
      width: 100%;
      max-width: 375px;
    }
    
  }
  @media ${devices.laptop} {
    background: #F7F5F9;
    padding: 18px 24px;
    overflow: auto;
    .inner-content-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 24px;
      .section {
        margin: 0;
        padding: 15px 0;
        width: 450px;
        background: #FFFFFF;
        border-radius: 14px;
        ${({ sectionHeight }) => sectionHeight && css`
          height: ${sectionHeight}px;
        `}
      }
    }
  }
`
export const ProviderSearchLink = styled.div`
  padding: 0 47px;
  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #173FD4;
  }
  margin-bottom: 25px;
  text-align: center;
`
export const TabsWrapper = styled.div`
  .apt-status-tab {
    padding: 0 14px;
    margin-bottom: 27px;
  }
  .view-type-tab {

  }
  margin-bottom: 27px;
`
export const AptTypeWrapper = styled.div`
  padding: 0 25px;
  .all {
    text-align: center;
    button {
      font-weight: 600;
      font-size: 14px;
      line-height: 12px;
      color: #C4C4C4;
    }
    button.active {
      color: #173FD4;
    }
    margin-bottom: 33px;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
  margin-bottom: 35px;
`

export const CalendarViewWrapper = styled.div`
  padding: 12px 0px;
  border-top: 1px dashed #000000;
  .headline {
    padding-left: 10px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
`
