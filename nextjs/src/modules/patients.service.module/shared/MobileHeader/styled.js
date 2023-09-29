import styled from "styled-components";


export const HeaderWrapper = styled.div`
  padding: 26px 11px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`
export const LeftPart = styled.div`
  display: flex;
  align-items: center;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 11px;
    letter-spacing: -0.165px;
    color: #000000;
    padding-left: 30px;
  }
`
export const RightPart = styled.div`
  display: flex;
  align-items: center;
`
export const LoggedInGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  img.avatar {
    border-radius: 50%;
  }
  img {
    cursor: pointer;
  }
`
export const BellWithNotification = styled.div`
  position: relative;
  div {
    position: absolute;
    top: -8px;
    left: -10px;
    width: 14px;
    height: 14px;
    border: 2px solid red;
    border-radius: 50%;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
` 
export const WelcomeGuest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 38px;
  & span {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    text-decoration: underline;
  }
  & a {
    margin-top: 6px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #173FD4;
    text-decoration: none;
  }
`