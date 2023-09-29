import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 280px;
  width: 325px;
  border-radius: 12px;
  background: #f9f9f9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 268px;
  height: 109px;
`

export const Label = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  text-align: center;
  color: #f00001;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  width: 268px;
  margin-top: 25px;
`

export const Button = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #173fd4;
  cursor: pointer;
`

export const CancelButton = styled(Button)`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
  cursor: pointer;
`

export const ImageWrapper = styled.div`
  margin-top: 12px;
`