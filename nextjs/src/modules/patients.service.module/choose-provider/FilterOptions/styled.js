import styled, { css } from "styled-components";


export const FilterWrapper = styled.div`
  padding: 0 5px;
`
export const NetworkWrapper = styled.div`
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
      color: #000000;
    }
    div.boxgroup {
      display: flex;
      column-gap: 42px;
      align-items: center;
    }
  }
  border-bottom: 1px solid #d3d3d3;
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
  ${({ isPCP }) => isPCP && css`
    label {
      background-color: #0085FE;
    }
  `}
  ${({ isPOEM }) => isPOEM && css`
    label {
      width: 36px;
      height: 10px;
      color: #FF0000;
      background-color: transparent;
      text-shadow: 0px 0px 10px #FF0000;
    }
  `}
`
export const SpecialtyWrapper = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
  }
  & > div {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
  button.dropdown-btn {
    width: 171px;
    padding: 4px 9px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span.selected-specialty {
      white-space: nowrap;
      overflow: hidden;
      max-width: 145px;
      text-overflow: ellipsis;
      img {
        margin-right: 6px;
      }
    }
  }
  & > div:last-child{
    display: flex;
    flex-direction: row;
    column-gap: 24px;
    justify-content: flex-end;
    label {
      width: 76px;
    }
  }
  div.specialty-popup {
    position: relative;

    div.popup-body {
      position: absolute;
      top: 46px;
      left: 0;
      min-width: 171px;
      background-color: white;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding: 8px 0;
      z-index: 1;
      button.item {
        width: 100%;
        background: white;
        margin: 0;
        border: none;
        outline: none;
        padding: 0 18px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 28px;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
        white-space: nowrap;
        &:hover {
          background: rgba(0, 101, 251, 0.2);;
        }
        
      }
    }
  }

  border-bottom: 1px solid #d3d3d3;
`
export const DateTimeWrapper = styled.div`
  padding: 15px 0;
  div.header {
    display: flex;
    column-gap: 47px;
  }
  border-bottom: 1px solid #d3d3d3;
`
export const OptionWrapper = styled.div`
  display: flex;
  column-gap: 7px;
  align-items: center;
  label {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 11px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #000000;
  }
  input {
    width: 20px;
    height: 20px;
  }
`
export const DateTimeContainer = styled.div`
  padding: 21px 0;
  display: flex;
  column-gap: 10px;
`
export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 21px;
`
export const FormGroup = styled.div`
  position: relative;
  width: 133px;
  height: 43px;
  border: 1px solid #000000;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  span.title {
    position: absolute;
    top: -8px;
    left: 8px;
    background-color: #ffffff;
    padding: 0 5px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
  div.my-date-picker {
    input {
      border: none;
      outline: none;
      max-width: 60px;
    }
  }
  .usual-input {
    border: none;
    outline: none;
    width: 100%;
  }
  ${({ disabled }) => disabled && css`
    border: 1px solid #ECECEC;
  `}
`
export const PriceRangeWrapper = styled.div`
  padding: 21px 0 15px 0;
  display: flex;
  column-gap: 10px;
  border-bottom: 1px solid #d3d3d3;
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
    margin-bottom: 4px;
  }
  border-bottom: 1px solid #d3d3d3;
`
export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`
export const UnitRating = styled.div`
  label {
    display: inline-block;
    width: 100%;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    text-align: center;
    margin-bottom: 8px;
  }
  div.stars-wrapper {
    padding: 0 18px;
    .my-stars {
      width: 100%;
      display: flex !important;
      justify-content: space-between;
      .icon {
        width: 30px;
        height: 30px;
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
    border: 0.5px solid #000000;
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
  }
`
