import styled, { css } from "styled-components";


export const DesktopHeaderWrapper = styled.div`
  width: 100%;
  height: 83px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-bottom: 1px solid #DFE2E9;
  ${({ marginBottom }) => marginBottom && css`
    margin-bottom: ${marginBottom}px;
  `}
  > button {
    cursor: pointer;
  }
`
export const LeftWrapper = styled.div`
  div.header-title {
    margin-bottom: 0;
    padding: 0 39px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 22px;
    color: #0086FF;
  }
`
export const RightWrapper = styled.div`
  padding: 0 119.29px 0 39px;
  display: flex;
  column-gap: 51px;
  flex-direction: row-reverse;
`
export const UserWrapper = styled.div`
  display: flex;
  column-gap: 12.49px;
  img {
    border-radius: 30px;
  }
  div.user-info {
    margin-top: 11px;
    display: flex;
    flex-direction: column;
    row-gap: 2.4px;
    div.user-name {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: #000000;
    }
    button {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      display: inline;
      text-align: left;
      background: transparent;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #173FD4;
    }
  }

`
export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`
export const BellWrapper = styled.div`
  position: relative;
  .notify-count {
    position: absolute;
    left: -8px;
    top: -5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #FF0000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 9px;
    line-height: 0px;
    color: #000000;
  }
`