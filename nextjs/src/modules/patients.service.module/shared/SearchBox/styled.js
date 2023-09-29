import styled from "styled-components";


export const SearchBoxWrapper = styled.div`
  padding: 0 15px 0 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
  & button {
    padding-left: 18px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 12px;
    color: #173FD4;
    background-color: transparent;
    border: none;
    outline: none;
  }
`
export const SearchBoxContainer = styled.div`
  position: relative;
  flex: 1;

`
export const InputBox = styled.input`
  width: 100%;
  height: 32px;
  background: #FFFFFF;
  border: 0.5px solid #000000;
  box-sizing: border-box;
  border-radius: 6px;
  text-indent: 95px;
  &:focus {
    outline: none;
    border-color: #173FD4;
  }
`
export const MagnifyingGlass = styled.div`
  position: absolute;
  top: 10px;
  left: 69px;
`
export const DropDownWrapper = styled.div`
  position: absolute;
  width: 61px;
  top: 0.5px;
  left: 0.5px;
`
export const DropDownButton = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 4px;
  border: 0.5px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
` 
export const Caption = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.165px;
  color: #000000;
  overflow: hidden;
  word-break: normal;
`
export const DropDownContent = styled.div`
  margin-top: 4px;
  padding: 5px 0;
  background: #FFFFFF;
  border-radius: 0px 0px 12px 12px;
  min-width: 170px;
  z-index: 3;
  position: relative;
`
export const DropDownItem = styled.div`
  padding: 10px 9px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  color: #000000;
  cursor: pointer;
  &:hover {
    background-color: #B8C3D5;
    color: white;
  }
`
