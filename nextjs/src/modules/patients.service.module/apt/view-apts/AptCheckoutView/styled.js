import styled from "styled-components";
import { devices } from "../../../../../common/constant/global";

export const AptCheckoutViewWrapper = styled.div`
  padding: 0px 7px;
  .header-desktop {
    display: none;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    padding: 10px 0px 0px 0px;
  }
  @media ${devices.laptop} {
    .header-desktop {
      display: block;
    }
  }
`

export const FooterWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }
  .btn-cancel button {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 12px;
    color: #000000;
  }
  .btn-next button {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 12px;
    color: #173FD4;
    :disabled {
      color: #C4C4C4;
      cursor: not-allowed;
    }
  }
  @media ${devices.laptop} {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
`