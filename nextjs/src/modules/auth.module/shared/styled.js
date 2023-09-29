import styled from "styled-components"

export const InputGroupWrpper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  column-gap: 12px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  .input-box {
    flex: 1;
    height: 43px;
    font-weight: 700;
    border: 0.5px solid #5A585D;
    border-radius: 5px;
    text-indent: 10px;
    padding-right: 40px;
    &:focus {
      outline: none;
      border: 0.5px solid #173FD4;
    }
  }
  span.caption {
    position: absolute;
    top: -8px;
    left: 10px;
    background: white;
    padding: 0 3px;
  }
  div.eye-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .error-msg {
    position: absolute;
    top: 46px;
    left: 0;
    color: red;
  }
`
export const Title = styled.div`
  text-align: center;
  margin-top: 56px;
  color: black;
  &.big {
    font-weight: 700;
    font-size: 46px;
    line-height: 46px;
  }
  &.small-big {
    font-weight: 500;
    font-size: 22px;
    line-height: 22px;
  }
  &.middle {
    font-weight: 500;
    font-size: 18px;
  }
  &.normal {
    font-weight: 600;
    font-size: 14px;
  }
  &.small {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
  }
  &.blue {
    color: #173fd4;
  } 
  &.mt-0 {
    margin-top: 0px;
  }
  &.mt-30 {
    margin-top: 30px;
  }
  &.mt-20 {
    margin-top: 20px;
  }
  &.mt-8 {
    margin-top: 8px;
  }
  &.left {
    text-align: left;
  }
`

export const EyeWrapper = styled.div`
  position: absolute;
  top: 6px;
  left: calc(100% - 35px);
  background: white;
  padding: 5px;
  z-index: 10;
`
export const IconInput = styled.input`
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 200px;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  font-weight: 600;

  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const StrongText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 13px;
  color: #000000;
  justify-content: center;
  margin-top: 2px;
`

export const OptionLabel = styled.label`
  margin-left: 5px;
  font-family: SF Pro Text;
  font-size: 12px;
  font-weight: 600;
  line-height: 10px;
`
export const PwdStrengthMark = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: flex-start;
  left: 5px; bottom: 2px; 
  align-items: center;   
`
export const PwdStrengthSeg = styled.div`
  padding-left:5px;
  padding-right: 5px;
  padding-top:4px;
  background-color: red;
  border-radius: 2px;
  margin-left: 5px;
`
export const PwdStrengthLabel = styled.div`
  font-family: SF Pro Text;
  font-size: 9px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0px;
  text-align: left;
  color: red;
  margin-left: 10px;
`
export const SuggestionNameWrapper = styled.div`
  font-family: SF Pro Text;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  margin: 15px 0 0 10px;
  .title {
    color: #173FD4;
  }
  ul {
    color: black;
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
`