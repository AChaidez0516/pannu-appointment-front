import styled from "styled-components";

export const Description = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  margin-top: 15px;
  &.mt-0 {
    margin-top: 0px;
  }
`
export const LinkButton = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  color: #173fd4;
  display: flex;
  justify-content: center;
  &.small {
    font-size: 14px;
  }
`