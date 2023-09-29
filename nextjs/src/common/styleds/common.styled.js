import styled, { css }  from 'styled-components'
import { devices } from '../constant/global'

export const Wrapper = styled.div`
  * {
    font-family: SF Pro Text;
    font-style: normal;
  }
  width: auto;
  display: block;
  &.center {
    justify-content: center;
  }
  
  @media ${devices.laptopM} {
    max-width: 1310px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
`
export const FormWrapper = styled.div`
  padding:0px;
  background-color: white;
  
  @media ${devices.laptopM} {
    position: relative;
    padding: 0 10px;
    min-height: 100vh;
    width: 600px;
  }
`
export const FormContainer = styled.div` 
  margin-top: 0px;
  @media ${devices.laptopM} {
    margin-top: 80px;
  }
`
export const FigureWrapper = styled.div`
  display: none;
  @media ${devices.laptopM} {
    display: block;
    flex: 1 0 0;
  }
`
export const ContentWrapper = styled.div`
  @media ${devices.mobileS} {
    width: 345px;
    margin: 0 auto;
  }
`
export const BottomWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  left: 0px; bottom: 0px;
`
export const MobileViewer = styled.div`
  display: block;
  @media ${devices.laptopM} {
    display: none;
  }
`
export const DesktopViewer = styled.div`
  display: none;
  @media ${devices.laptopM} {
    display: block;
  }
`
export const InputFieldLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 3px;
  background: white;
  padding: 5px;
  z-index: 10;
  
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  color: #000000;
`
export const Input = styled.input`
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  font-weight: 600;
  
  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`
export const InputReadOnly = styled.div`
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  line-height: 23px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 13px;
  
  &:focus {
    font-size: 24px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const InputDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 20px 0px 0 0px;
  justify-content: space-between;
  font-family: SF Pro Text;
  .err-msg {
    position: absolute;
    top: -33px;
    left: 3px;
    padding: 5px;
    z-index: 10;
    color: red;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: left;
  }
  &.required input, &.required select {
    border-color: red;
  }
  &.required > .err-msg {
    display: block;
  }
  &.column {
    flex-direction: column;
  }
  ${({ isInvalid }) => isInvalid && css`
    input {
      border: 0.5px solid red;
    } 
  `}
  div.eye-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
`

export const CSelect = styled.select`
  background-color: #ffffff;
  border: 0.5px solid #5a585d;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  outline: none;
  padding: 10px 10px 10px 4px;
  width: 100%;
`
export const CenteredRow = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: ${props => props.marginTop}px; 
`
export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-center {
    align-items: center;
  }
  margin-top: ${props => props.marginTop}px;
`
export const DesktopTitle = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: #000;
  padding: 10px 0 30px;
  text-align: center;
`

export const LinkButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #173fd4;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  &.cl-black {
    color: black;
  }
  &.cl-gray {
    color: rgba(0, 0, 0, 0.36);
  }
  &.small {
    font-size: 14px;
    line-height: 14px;
  }
  &.smallest {
    font-size: 10px;
    line-height: 10px;
  }
  &.normal {
    font-size: 16px;
    line-height: 16px;
  }
  &.middle {
    font-size: 18px;
    line-height: 18px;
  }
  &.big {
    font-size: 22px;
    line-height: 22px;
  }
  &.strong {
    font-weight: 600;
  }
`
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-center {
    align-items: center;
  }
  margin-top: ${props => props.marginTop}px;
  column-gap: ${props => props.columnGap}px;
`
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64.6px;
  * {
    color: lightgray;
  }
`


