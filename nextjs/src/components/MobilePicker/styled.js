import styled, { css } from 'styled-components'

export const SeparatorColumn = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  .separator {
    height: ${props => props.itemHeight}px;
    line-height: ${props => props.itemHeight}px;
    color: #CDCDCD;
    :nth-child(${props => props.middleNo}) {
      color: ${props => props.disabled ? '#CDCDCD' : '#000000'};
    }
  }
`;

export const PickerContainer = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #000000;

  z-index: 10001;

  width: ${props => props.width}px;
  height: ${props => props.height}px;

  &, *, *:before, *:after {
    box-sizing: border-box;;
  }

  .picker-inner {
    position: relative;

    display: flex;
    justify-content: center;
    height: 100%;
    padding: 0 ${props => props.padding}px;

    // font-size: 1.2em;
    font-size: 12px;
    // -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
  }

  .picker-column {
    flex: 1 1;

    position: relative;

    max-height: 100%;

    overflow: hidden;
    text-align: center;

    .picker-scroller {
      transition: 300ms;
      transition-timing-function: ease-out;
    }

    .picker-item {
      position: relative;

      padding: 0px;

      white-space: nowrap;
      color: #CDCDCD;
      overflow: hidden;
      text-overflow: ellipsis;

      &.picker-item-selected {
        color: #222;
      }
      :hover {
        cursor: default;
      }
      &.disabled {
        color: #CDCDCD;
      }
    }
  }

  .picker-highlight {
    position: absolute;
    top: 50%;
    left: 0;

    width: 100%;

    pointer-events: none;

    &:before, &:after {
      content: ' ';
      position: absolute;
      left: 0;
      right: auto;

      display: block;
      width: 100%;
      height: 1px;

      background-color: #d9d9d9;
      transform: scaleY(0.5);
    }

    &:before {
      top: 0;
      bottom: auto;
    }

    &:after {
      bottom: 0;
      top: auto;
    }
  }
}`;
