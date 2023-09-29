import styled from 'styled-components'
import { IMaskInput } from 'react-imask'

export const MaskInput = styled(IMaskInput)`
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
  &.regular {
    font-weight: 400;
  }
`
export const MaskInput_1 = styled(IMaskInput)`
  border: 0.5px solid #cccccc;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  &:focus {
    border-color: #173FD4;
    border-width: 0.5px;
    outline: none;
  }
`
export const MaskInput_2 = styled(IMaskInput)`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 36px;
  width: 100%;
  font-size: 10px;
  
  &:focus {
    font-size: 21px;
  }
  &.border {
    border: 0.5px solid #eee;
    border-radius: 5px;
  }
  &.cl-gray {
    color: #999!important;
  }
  &.normal {
    font-size: 14px;
  }
  &.center {
    text-align: center;
  }
`

export const MaskInput_3 = styled(IMaskInput)`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  font-size: 10px;
  
  &:focus {
    font-size: 21px;
  }
  &.border {
    border: 0.5px solid #999;
    border-radius: 5px;
  }
  &.cl-gray {
    color: #999!important;
  }
  &.normal {
    font-size: 14px;
  }
  &.center {
    text-align: center;
  }
`