import styled from "styled-components";
import { devices } from "../../../../common/constant/global";


export const SectionWrapper = styled.div`
  position: relative;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 1024px) {
    padding: 27px 4px;
  }
`
export const SectionWrapperBackDrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`
export const AptWrapper = styled.div`
  margin: 0 10px 10px 10px;
  .item {
    width: 100%;
    font-weight: 500;
    font-size: 11px;
    line-height: 24px;
  }
  .item.right {
    text-align: right;
  }
  .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .details > div {
    flex: 50%;
  }
  .full {
    flex: 100%;
  }
`

export const ReasonWrapper = styled.div`
  padding: 7px;
  margin: 10px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  
  .title {
    font-weight: 500;
    font-size: 11px;
    line-height: 18px;
    margin-bottom: 6px;
    margin-top: 0px;
  }
  .line {
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
  }
`

export const Row1 = styled.div`
  margin-top: 30px;
  width: 270px;
  margin-left: 10px;
  .row {
    display: flex;
    justify-content: space-between;
    > div {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
    }
    margin-bottom: 13px;
  }
`

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
    padding: 0;
    .header-desktop {
      display: block;
    }
  }

  font-family: 'SF Pro Text';
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`
export const AddMoreActivityWrapper = styled.div`
  margin-top: 26px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }

  margin-bottom: 14px;
`
export const ListWrapper = styled.div`
  background: #E4E9F5;
  border-radius: 15px;
  padding: 10px 4px 13px 4px;
`