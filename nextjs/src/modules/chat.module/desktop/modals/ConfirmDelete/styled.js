import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  width: 293px;
  height: 177px;
  position: absolute;
  top: 45%;
  left: calc(50% - 147px);
  padding: 10px;
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Label = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  text-align: center;
  color: #f00001;
  margin-left: 10px;
  margin-top: 10px;
`
export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-right: 5px;
  margin-top: 30px;
`
export const Button = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #173fd4;
  margin-left: 10px;
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