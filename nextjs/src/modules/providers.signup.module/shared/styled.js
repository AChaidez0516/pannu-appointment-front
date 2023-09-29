import styled, { css } from "styled-components";
import { IMaskInput } from 'react-imask'
import AutoComplete from 'react-google-autocomplete'
import Image from 'next/image'


export const ProviderWrapper = styled.div`
width: 100%;
padding-bottom: 20px;
background-color: #F0F2F5;
`
export const Container = styled.div`
  position: relative;
  display: flex;
  width: 1467px;
  border-radius: 8px;
  background-color:white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  margin: 0px auto;
  margin-top: 19px;
`
export const Panel = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 20px 10px 20px 0;
  
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
  }
`
export const LinkButton = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #173fd4;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`

export const InputRow = styled.div`
  display:flex;
  justify-content:space-between;
  column-gap: ${props => props.columnGap}px;
  margin-top: ${props => props.marginTop}px;
  &.justify-start {
    justify-content: flex-start;
  }
  &.justify-end {
    justify-content: flex-end;
  }
  &.justify-around {
    justify-content: space-around;
  }
  &.justify-baseline {
    justify-items: baseline;
  }
`
export const Caption = styled.div`
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  color: #000;
`
export const InputDiv = styled.div`
  display: flex;
  position: relative;
  margin: 20px 0px 0 0px;
  justify-content: space-between;
`
export const InputFieldLabel = styled.div`
  position: absolute;
  top: -10px;
  left: 10px;
  background: white;
  padding: 0 5px;
  z-index: 10;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #65676B;
`
export const Input = styled.input`
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

export const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 13px;
  padding: 5px 10px;
  margin-right: 30px;
  .btn-group {
    width: 49px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
`
export const ItemTitle = styled.div`
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  margin-right: 10px;
`
export const FileWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 5px;
`
export const UploadButton = styled.div`
  border-radius: 5px;
  border: 1px solid #173fd4;
  padding: 5px;
  cursor: pointer;
  display: inline;
  color: #173fd4;
`
export const Bottom = styled.div`
    position: absolute;
    width: 100%;
    left:0; bottom: 0;
`
export const BottomWrapper = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.25);    
    padding: 10px 0;
    width: 100%;    
`
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`
export const Row = styled.tr`
  border-bottom: 1px solid #999;
  &.no-border {
    border: 0;
  }
`
export const Col = styled.td`
  padding-top: 16px;
  padding-bottom: 13px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  color: #65676B;
  text-align: center;
  &.left {
    text-align: left;
  }
`
export const Col1 = styled.td`
  padding-top: 16px;
  padding-bottom: 13px;
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  color: #5A585D;
`
export const Label = styled.label`
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: center;
  color: #000000;
`
export const ImgButton = styled(Image)`
  cursor:pointer;
`
export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45px;
`
export const Text = styled.label`
  font-family: SF Pro Text;
  font-size: 13px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
  color: #65676B;
`
export const SimpleBar = styled.div`
  overflow-y: auto;
  
  &::-webkit-scrollbar, .pasteWrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track, .pasteWrapper::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb, .pasteWrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-thumb:hover, .pasteWrapper::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  &::-webkit-scrollbar-thumb:active, .pasteWrapper::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
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
  &.justify-start {
    justify-content: flex-start;
  }
  &.justify-end {
    justify-content: flex-end;
  }
  &.align-center {
    align-items: center;
  }
  &.flex-wrap {
    flex-wrap: wrap;
  }
  margin-top: ${props => props.marginTop}px;
`
