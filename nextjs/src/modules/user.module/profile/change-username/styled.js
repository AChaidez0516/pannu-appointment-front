import styled from "styled-components";

export const RecoveredName = styled.div`
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 7px;
  height: 60px;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ResultTitle = styled.h3`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 14px;
  color: #29b05a;

  display: flex;
  justify-content: center;
`
export const Title = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  color: #000000;
  text-align: center;
  &.big {
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
  }
  &.normal {
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
  }
  &.small {
    font-weight: 600;
    font-size: 14px;
    line-height: 13px;
  }
  &.mt-20 {
    margin-top: 20px;
  }
  &.mt-40 {
    margin-top: 40px;
  }
  &.left {
    text-align: left;
  }
`
export const EyeWrapper = styled.div`
  position: absolute;
  top: 6px;
  left: calc(100% - 35px);
  background: white;
  padding: 5px;
  z-index: 10;
`