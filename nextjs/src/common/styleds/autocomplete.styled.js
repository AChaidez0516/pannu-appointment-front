import dynamic from 'next/dynamic'
import styled from 'styled-components'
import {IMaskInput} from "react-imask";
const AutoComplete = dynamic(() => import('react-google-autocomplete'))

export const AddressInput = styled(AutoComplete)`
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 13px;
  
  &:focus {
    font-size: 24px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const AddressInput_1 = styled(AutoComplete)`
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