import styled from "styled-components";
import {IMaskInput} from "react-imask";

export const TopWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(23, 63, 212, 0.2);
  border-radius: 5px;
  padding: 4px 14px 4px 14px;
`
export const TopText = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */

  color: #173fd4;
`
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`
export const Text = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
  flex: 1;
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  &.center {
    text-align: center;
  }
`
export const MaskInput = styled(IMaskInput)`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 43px;
  width: 100%;
  font-size: 10px;
  
  &:focus {
    font-size: 24px;
  }
`