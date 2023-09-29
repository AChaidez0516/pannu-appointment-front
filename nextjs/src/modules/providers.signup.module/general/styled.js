import styled from 'styled-components'
import { IMaskInput } from 'react-imask'
import AutoComplete from 'react-google-autocomplete'


export const ReferralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 28px;
  .title-note {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
  }
  .input-wrapper {
    position: relative;
    .label {
      position: absolute;
      left: 11px;
      top: -9px;
      background: white;
      z-index: 1;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #65676B;
      padding: 0 2px;
    }
    .input-box {
      width: 170px;
      height: 43px;
      border: 0.5px solid #cccccc;
      border-radius: 5px;
      text-indent: 17px;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #333333;
      box-sizing: border-box;
      &:focus {
        border-color: #173FD4;
        border-width: 0.5px;
        outline: none;
      }
    }
  }
  margin-bottom: 21px;
`