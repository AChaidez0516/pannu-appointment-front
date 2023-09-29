import styled from "styled-components"

export const InputGroupWrapper = styled.div`
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
    width: ${props => props.style.width}px;
    height: 43px;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    border: 0.5px solid #5A585D;
    border-radius: 5px;
    text-indent: 5px;
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