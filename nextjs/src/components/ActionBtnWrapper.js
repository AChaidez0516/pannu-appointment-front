import styled, { css, keyframes } from "styled-components";
// import { darken } from 'polished'

const loadingSpineer = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
export const ActionBtnWrapper = styled.div`
  margin: 24px 0;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${({ twoMoreBtns }) => twoMoreBtns && css`
    justify-content: space-between;
  `}
  ${({ centered }) => centered && css`
    justify-content: center;
  `}
  ${({ m }) => m && css`
    margin: ${m}
  `}
`
export const ActionBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 12px;
  color: #173FD4;
  cursor: pointer;
  ${({ color }) => color && css`
    color: ${color};
  `}
  ${({ fontS }) => fontS && css`
    font-size: ${fontS}px;
  `}
  ${({ fontW }) => fontW && css`
    font-weight: ${fontW};
  `}
  ${({ lineH }) => lineH && css`
    line-height: ${lineH}px;
  `}
  ${({ textA }) => textA && css`
    text-align: ${textA}
  `}
  ${({ disabled }) => disabled && css`
    color: #A4A4A4;
  `}
  ${({ isLoading }) => isLoading && css`
    color: transparent;
    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: ${props => props.theme.colors.white};
      border-bottom-color: ${props => props.theme.colors.white};
      border-radius: 50%;
      animation: ${loadingSpineer} 1s linear infinite;
    }
  `}
`