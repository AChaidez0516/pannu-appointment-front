import styled from 'styled-components'

export const SelectWrapper = styled.div`
  font-family: SF Pro Text;
  .root {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .text {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      color: ${props => props.color}
    }
    .select-icon {
      border-left: 2px solid #000000;
      border-bottom: 2px solid #000000;
      transform: rotateZ(315deg);
      width: 7px; height: 7px;
      transition: transform 0.1s linear;
    }
    .select-icon.reverse {
      transform: rotateZ(135deg);
    }
  }
`
export const PopupWrapper = styled.div`
  min-width: ${props => props.width + 20}px;
  font-family: SF Pro Text;
  .item {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    cursor: pointer;
    padding: 10px 10px;
    cololr: ${props => props.color}
  }
  .item:hover {
    background-color: #eee;
  }
  .item.selected {
    background-color: #0065FB40;
  }
`