import styled from "styled-components";
import { devices } from "../../../../../common/constant/global";

export const AptRescheduleViewWrapper = styled.div`
  padding: 0px 7px;
  @media ${devices.laptop} {
    padding: 0px;
  }
`

export const FooterWrapper = styled.div`
  margin-top: 15px;
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
    }
  }
  @media ${devices.laptop} {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
`