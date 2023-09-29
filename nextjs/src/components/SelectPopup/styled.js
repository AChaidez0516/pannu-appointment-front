import styled, { css } from 'styled-components'

const disableColor = '#C4C4C4';
export const SelectWrapper = styled.div`
  width: fit-content;
  
  .root {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 10px;
    position: relative;
    border: solid ${props => props.styles.borderWidth}px ${props => props.styles.borderColor};
    border-radius: ${props => props.styles.borderRadius}px;
    
    .label {
      position: absolute;
      top: -12px;
      left: 6px;
      font-size: ${props => props.styles.labelFontSize}px;
      background-color: white;
      padding: 5px;
    }
    
    .text {
      font-size: ${props => props.styles.fontSize}px;
      font-weight: 600;
      line-height: 14px;
      color: ${props => props.styles.color}
    }
    .select-icon {
      border-left: 2px solid #000000;
      border-bottom: 2px solid #000000;
      transform: rotateZ(315deg);
      width: 7px; height: 7px;
      transition: transform 0.1s linear;
      border-color: ${props => props.styles.color};
      margin-top: -4px;
    }
    .select-icon.reverse {
      transform: rotateZ(135deg) translateY(-3px);
    }
    ${({isdisabled}) => isdisabled && css`
      border-color: ${disableColor};
      .label {
        color: ${disableColor};
      }
      .select-icon {
        border-color: ${disableColor};
      }
    `}
  }
`
export const PopupWrapper = styled.div`
  font-family: 'SF Pro Text';
  padding: 0 10px;
  min-width: ${props => props.width}px;
  max-height: 300px;
  
  .item {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    padding: 15px 10px;
    color: #173FD4;
    text-align: center;
    background-color: #FFFFFF;
    border-bottom: 1px solid #BBBBBE;
  }
  .item:hover {
    background-color: #fff;
  }
  .item.selected {
    background-color: #173FD4;
    color: white;
  }
  .item:first-child {
    border-radius: 9px 9px 0px 0px;
  }
  .item:last-child {
    border-bottom: none !important;
  }
`