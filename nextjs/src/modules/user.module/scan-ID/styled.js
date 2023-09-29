import styled from "styled-components";

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
export const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #000000;
  justify-content: center;
`
export const BottomWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 40px;
  left: 0px;
  right: 0px;
`