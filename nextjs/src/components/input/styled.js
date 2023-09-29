import styled, { css } from 'styled-components';

export const FormControllWrapper = styled.div`
  position: relative;
  .label {
    width: fit-content;
    position: relative;
    z-index: 100;
    margin: 0px 13px;
    padding: 0px 2px;
    background: white;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #65676B;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    min-width: 50px;
    position: relative;
    top: -8px;
    border: 0.5px solid rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 12px 16px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
    :focus-visible {
      border-width: 1px;
      outline: none;
    }
  }
  &.red-border {
    input {
      border-color:red;
    }
  }  
  .error-message {
    margin-top: -5px;
    color: red;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
  }
  &.dob {
    width: 170px;
    margin-right: 34px;
    margin-top: 20px;
  }
  &.ssn {
    width: 105px;
    margin-right: 34px;
    margin-top: 20px;
  }
  &.lastName {
    width: 201px;
    margin-right: 34px;
    margin-top: 35px; 
  }
  ${({ isInvalid }) => isInvalid && css`
    input {
      border: 0.5px solid red;
    } 
  `}
`;
