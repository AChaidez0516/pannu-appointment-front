import styled, { css } from "styled-components";
import { devices } from "../../../common/constant/global";


export const MainContentWrapper = styled.div`
  background: white;
  padding: 18px 0;
  .inner-content-wrapper {
    margin: 0 auto;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // row-gap: 20px;
    // .section {
    //   margin: 0 auto;
    //   width: 100%;
       max-width: 375px;
    // }
    
  }
  @media ${devices.laptop} {
    background: #F7F5F9;
    padding: 18px 24px;
    overflow: auto;
    .inner-content-wrapper {
      //display: flex;
      flex-direction: row;
      column-gap: 24px;
    margin: 0 auto;
    padding: 15px 0;
    width: 450px;
    background: #FFFFFF;
    border-radius: 14px;
    ${({ sectionHeight }) => sectionHeight && css`
       height: ${sectionHeight}px;
    `}
    }
  }
`


export const ProviderSearchWrapper = styled.div`
  height: 813px;
  overflow: auto;
  margin: 0 auto;
`
export const AddressWrapper = styled.div`
  padding: 0 11px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .location {
    display: flex;
    column-gap: 12px;
    .address {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      letter-spacing: 0.357px;
      color: #000000;
    }
  }
  .links {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
  }
  a {
    text-decoration: none;
    color: #173FD4;
  }
  margin-bottom: 10px;
`
export const AdsTitle = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0.357px;
  color: #000000;
  margin-bottom: 9px;
`
export const AdsContent = styled.div`
  padding: 10px;
  /* width: 100%; */
  min-height: 300px;
  background-color: white;
`
export const OurMembers = styled.div`
  margin-bottom: 10px;
`
export const SlideImgWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 0.5px solid #000000;
  display: flex;
  column-gap: 10px;
`
export const SpecialOffers = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #000000;
  img {
    cursor:pointer;
  }
`
export const UserComments = styled.div`
  
`
export const ResultsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`
