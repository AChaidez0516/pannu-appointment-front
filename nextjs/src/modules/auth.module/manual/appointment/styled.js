import styled from "styled-components";
import { IMaskInput } from "react-imask";

export const AppointmentWrapper = styled.div`
  * {
    font-family: SF Pro Text;
    font-style: normal;
  }
  display: block;
  &.center {
    justify-content: center;
  }
  height: 100vh;
  background-color: white;
  width: 375px;
  max-width: 1310px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const InputFieldLabel = styled.div`
  position: absolute;
  top: -20px;
  left: 5px;
  background: white;
  padding: 8px 0 0 5px;
  z-index: 10;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 14px;

  color: #000000;
`

export const LeftWrapper = styled.div`
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  padding: 34px 12px;
`;

export const ButtonOrder = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: flex-end;
`;

export const ButtonsBottomRow = styled.div`
  display: flex;
  margin-top: 29px;
  margin-bottom: 28px;
  justify-content: space-between;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-center {
    align-items: center;
  }
  margin-top: ${(props) => props.marginTop}px;
`;

export const LinkButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #173fd4;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  &.cl-black {
    color: black;
  }
  &.cl-gray {
    color: rgba(0, 0, 0, 0.36);
  }
  &.small {
    font-size: 14px;
    line-height: 14px;
  }
  &.smallest {
    font-size: 10px;
    line-height: 10px;
  }
  &.normal {
    font-size: 16px;
    line-height: 16px;
  }
  &.middle {
    font-size: 18px;
    line-height: 18px;
  }
  &.big {
    font-size: 22px;
    line-height: 12px;
  }
  &.strong {
    font-weight: 600;
  }
  &.reschedule {
    color: #173fd4;
    font-size: 22px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 12px;
    word-wrap: break-word;
  }
  &.cancel {
    color: #173fd4;
    font-size: 22px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 18px;
    word-wrap: break-word;
  }
`;
