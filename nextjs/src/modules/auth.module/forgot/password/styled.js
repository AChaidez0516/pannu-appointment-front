import styled from "styled-components";

export const Title = styled.h3`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 14px;
  color: #29b05a;

  display: flex;
  justify-content: center;
`
export const Popup = styled.div`
  background: #f3f5f5;
  box-sizing: border-box;
  border-radius: 21px;
  position: fixed;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  left: 50%;
  transform: translateX(-50%);
  top: 40%;
  height: 220px;
  z-index: 20;
  -webkit-box-shadow: 0px 0px 0px 9999px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 0px 9999px rgb(0 0 0 / 50%);
`
export const Text = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 12px;
  text-align: center;

  color: #f00001;
`