import styled, { css } from "styled-components";


export const ProfileWrapper = styled.div`
  // max-width: 475px;
  margin: 0 auto;
  ${({ device }) => device && device==="DESKTOP" && css`
    height: auto;
    max-width: 375px;
  `}
  ${({ device }) => device && device==="MOBILE" && css`
    max-width: 375px;
    overflow:auto;

  `}  
`
export const PaddingWrapper = styled.div`
  padding: 0 8px;
`
export const HeaderWrapper = styled.div`
  padding: 26px 11px;
  display: flex;
  justify-content: space-between;
  div {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #000000;
  }
  img {
    cursor: pointer;
  }
  ${({ device }) => device && device==="DESKTOP" && css`
    div {
      width: 100%;
      text-align: center;
    }
  `}
  margin-bottom: 5px;
`
export const ProfileBackImage = styled.div`
  width: 100%;
`
export const IconGroupWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: -35px;
  & > img {
    margin-top: 10px;
  }
`
export const StarGroup = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div.isPPO {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 29px;
    height: 15px;
    background-color: #29B05A;
    border-radius: 3px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 11px;
    color: #FFFFFF;
  }
  ${({ isPPO }) => isPPO && css`
    div.isPPO {
      background-color: #0085FE;
    }
  `}
`
export const CallMeWrapper = styled.div`
  text-align: center;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 8px;
  }
  div.bio {
    display: flex;
    justify-content: flex-start;
    column-gap: 18px;
    .i-am {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 12px;
      color: #000000;
    }
    ol {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      li {
        padding: 0;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 10px;
        color: #000000;
      }
    }

  }
  div {
    text-align: left;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
`
export const SliderWrapper = styled.div`
  padding: 2.5px 0;
  border-bottom: 0.5px solid #ECECEC;
  .dashed-line {
    margin-bottom: 2px;
  }
`
export const SlideImgWrapper = styled.div`
  width: 152px;
  height: 140px;
  background-size: cover;
  object-fit: contain;
`
export const ContactInfoWrapper = styled.div`
  padding: 12px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
  }
  div {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    span {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #173FD4;
    }
  }
  border-bottom: 0.5px solid #ECECEC;
`
export const SpecialInterestsWrapper = styled.div`
  padding: 10px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 10px;
  }
  span {
    display: inline-block;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 8px;
  }
  border-bottom: 0.5px solid #ECECEC;
`
export const PositionWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 10px;
  }
  span {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
  }
  border-bottom: 0.5px solid #ECECEC;
`
export const LocationWrapper = styled.div`
  padding: 10px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 10px;
  }
  border-bottom: 0.5px solid #ECECEC;
  ol {
    li {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 10px;
      color: #000000;
    }
  }
  div.locationHeader {
    display: flex;
    justify-content: space-between;
    h6 {
      margin: 0;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 10px;
      color: #000000;
    }
    div {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 10px;
      color: #000000;
    }
    margin-bottom: 10px;
  }
  div.locationAddress {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
    margin-bottom: 10px;
  }
  div.workHours {
    font-size: 12px;
    line-height: 16px;
    color: #000000;
    h6 {
      margin: 0;
      font-size: 12px;
      font-weight: 500;
    }
    div {
      font-weight: 400;
    }
    margin-bottom: 10px;
  }
  div.bottom {
    display: flex;
    justify-content: space-between;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #173FD4;
    a {
      text-decoration: none;
    }
    a.newPatient {
      font-size: 10px;
      font-weight: 600;
      color: #0AB425;
    }
  }
`
export const GoogleMapArea = styled.div`
  width: 100%;
  height: 195px;
  padding-bottom: 12.5px;
  border-bottom: 0.5px solid #ECECEC;
`
export const AffiliationWrapper = styled.div`
  padding: 12px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 16px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 12px;
      color: #173FD4;
    }
  }
  border-bottom: 0.5px solid #ECECEC;
`
export const ResearchWrapper = styled.div`
  padding: 12px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 16px;
  }
  div {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #173FD4;
  }
  border-bottom: 0.5px solid #ECECEC;
`
export const RecommendedWrapper = styled.div`
  padding: 12px 0;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 16px;
  }
  div {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #173FD4;
  }
  border-bottom: 0.5px solid #ECECEC;
`