import styled, { css } from "styled-components";


export const MainPageWrapper = styled.div`
  padding: 47px;
  background-color: #F7F5F9;
  img {
    cursor: pointer;
  }
`
export const MainContainer = styled.div`
  display: flex;
  column-gap: 45px;
  align-items: flex-start;
`
/** filter Wrapper in the left */
export const FilterWrapper = styled.div`
  width: 350px;
  background-color: white;
  padding: 17px 31px;
  border-radius: 5px;
  min-height: 878px;
  .title {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-bottom: 14px;
  }
  .search-params {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 20px;
  }
  .my-options {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
  }
`
export const PatientLocationWrapper = styled.div`
  display: flex;
  column-gap: 20.88px;
  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .location {
    flex: 1;
    .from-point {
      border: none;
      outline: none;
      border-bottom: 1px solid #8B93A6;
      padding: 0 0 3.93px 0;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      color: #3E3D3E;
    }
  }
  .distance {
    position: relative;
    width: 75px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      padding: 0 0 3.93px 0;
      border-bottom: 1px solid #8B93A6;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
      color: #3E3D3E;
      cursor: pointer;
      span {
        white-space: nowrap;
        max-width: 62px;
        text-overflow: ellipsis;
      }
      img {
        width: 10px;
      }
    }
    .distance-dropdown-menu {
      position: absolute;
      top: 43px;
      left: 0px;
      background: white;
      box-shadow: 0px 0px 8px #C4C4C4;
      min-width: 75px;
      cursor: pointer;
      .item {
        &:hover {
          background-color: rgba(0, 101, 251, 0.2);
        }
        div {
          padding: 8px;
          font-family: 'SF Pro Text';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 14px;
          color: #3E3D3E;
        }
      }
      z-index: 1;
    }
  }

`
export const OptionWrapper = styled.div`
  display: flex;
  column-gap: 7px;
  align-items: center;
  label {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #333333;
  }
  input {
    margin: 0;
    width: 20px;
    height: 20px;
  }
`
export const MedicineWrapper = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
  .input {
    position: relative;
    flex: 1;
    input {
      width: 100%;
      height: 27px;
      outline: 0;
      border: 1px solid #ECECEC;
      border-radius: 5px;
      text-indent: 22px;
    }
    .icon {
      position: absolute;
      right: 10px;
      top: 6px;
    }
  }
  margin-bottom: 20px;
`
export const AddedProvidersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 8px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    letter-spacing: -0.165px;
    color: #000000;
  }
  .added-providers {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    div {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 10px;
      color: #000000;
    }
  }
  margin-bottom: 10px;
`
export const DateTimeContainer = styled.div`
  padding: 21px 0;
  display: flex;
  column-gap: 16px;
`
export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`
export const FormGroup = styled.div`
  position: relative;
  width: 82px;
  height: 27px;
  border-bottom: 1px solid #ECECEC;
  display: flex;
  align-items: flex-end;
  span.date-title {
    position: absolute;
    top: -8px;
    left: 0px;
    background-color: #ffffff;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #0E0E0E;
  }
  div.my-date-picker {
    input {
      border: none;
      outline: none;
      max-width: 60px;
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
    }
  }
  .usual-input {
    border: none;
    outline: none;
    width: 100%;
  }
  padding-bottom: 2px;
  & > label {
    width: 19px;
    height: 19px;
  }
`
export const NetworkWrapper = styled.div`
margin-top: 12px;
  padding-bottom: 21px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  div.item {
    display: flex;
    align-items: center;
    h6 {
      width: 126px;
      margin: 0;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 11px;
      white-space: nowrap;
      color: #000000;
    }
    div.boxgroup {
      display: flex;
      column-gap: 42px;
      align-items: center;
    }
    h6.spec-item {
      width: 133px;
      margin-right: 50px;
    }
  }
`
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 18px;
    height: 18px;
    margin: 0 8px 0 0;
    padding: 0;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 29px;
    height: 14px;
    background-color: #29B05A;
    border-radius: 3px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;
    color: #FFFFFF;
  }
  ${({ isPPO }) => isPPO && css`
    label {
      background-color: #0085FE;
    }
  `}
`
export const RatingWrapper = styled.div`
  padding: 15px 0;
  h6 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 12px;
    color: #000000;
    margin-bottom: 11px;
  }

`
export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`
export const UnitRating = styled.div`
  display: flex;
  column-gap: 21px;
  align-items: center;
  label {
    display: inline-block;
    min-width: 90px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #0E0E0E;
  }
  div.stars-wrapper {
    padding: 0 18px;
    .my-stars {
      width: 100%;
      display: flex !important;
      column-gap: 4px;
      .icon {
        width: 18px;
        height: 18px;
      }
    }
  }
`
export const KeywordsWrapper = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  row-gap: 11px;
  label {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 12px;
    color: #000000;
  }
  textarea {
    width: 100%;
    height: 52px;
    border: 0.5px solid #ECECEC;
    box-sizing: border-box;
    border-radius: 5px;
    outline: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    background-color: transparent;
    border: none;
    outline: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
    color: #173FD4;
    cursor: pointer;
  }
`

/** content Wrapper in the middle */
export const ContentWrapper = styled.div`
  flex: 1;
  min-height: 806px;
`
export const ContentTabWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 17px 18px;
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    background-color: transparent;
    cursor: pointer;
    color: #000;
  }
  button.active {
    color: #173FD4;
  }
`
export const ContentContainer = styled.div`
  position: relative;
  min-height: 806px;
  width: 100%;
  display: flex;
  justify-content: center;
  .jmeQTo {
    min-height: 806px;
  }
  .filter-option {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
`
export const ListContentWrapper = styled.div`
  display: flex;
  width: 731px;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 12px;
`

/** profile Wrapper in the right */
export const ProfileWrapper = styled.div`
  width: 375px;
  min-height: 878px;
`
export const CopyLinkWrapper = styled.div`
  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
    span {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 14px;
      color: #000000;
    }
  }
`
export const ProfileContent = styled.div`
  background-color: white;
  border-radius: 5px;
`
export const ParagraphFont = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #0E0E0E;
`