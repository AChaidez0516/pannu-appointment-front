import styled from 'styled-components'

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
      font-weight: 400;
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
    }
    .select-icon.reverse {
      transform: rotateZ(135deg);
    }
  }
`
export const PopupWrapper = styled.div`
  font-family: 'SF Pro Text';
  min-width: ${props => props.width}px;
  max-height: 300px;
  
  .item {
    font-size: ${props => props.styles.itemFontSize}px;
    font-weight: 400;
    line-height: 14px;
    cursor: pointer;
    padding: 10px 10px;
    color: ${props => props.styles.color}
  }
  .item:hover {
    background-color: #eee;
  }
  .item.selected {
    background-color: #0065FB40;
  }
`