import styled, { css } from 'styled-components';

export const ViewWrapper = styled.div`
  padding: 15px 0px 7px 0px;
  display: flex;
  margin: 5px 0px;
  height: 400px;
  overflow: auto;
  .timeslot-space-wrapper {
    position: relative;
    width: 100%;
    padding: 0px 5px;
    .temp-rect {
      background: #aaaaaa;
      overflow: hidden;
    }
    .rect {
      background: #6595bd;
      border: 1px solid white;
      overflow: hidden;
      &.active {
        background: #6595ff;
        .top-left-resize {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 5px;
          height: 5px;
          background: black;
          cursor: nw-resize;
        }
        .bottom-right-resize {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 5px;
          height: 5px;
          background: black;
          cursor: nw-resize;
        }
      }
    }
    .temp-rect .duration, .rect .duration {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 10px;
      text-align: center;
      color: white;
      pointer-events: none;
        cursor: default;
    }
  }
`;

export const TimeslotLabel = styled.div`
  position: relative;
  width: 35px;
  top: -6px;
  margin-right: 0px;
  margin-bottom: 47px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  color: #000000;
`;

export const TimeslotSpace = styled.div`
  border-top: 1px dashed rgba(0, 0, 0, 0.41);
  height: 60px;
  :last-child {
    height: 0px;
  }
`;

export const EventWrapper = styled.div`
  position: relative;
  width: 44px;
  height: 14px;
  margin: 0px 8px;
  text-align: center;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #000000;
  ::before {
    position: absolute;
    top: 6px;
    left: 0px;
    content: "";
    width: 8px;
    border-top: 2px solid #0065FB;
  }
  ::after {
    position: absolute;
    top: 6px;
    right: 0px;
    content: "";
    width: 8px;
    border-top: 2px solid #0065FB;
  }
  :hover {
    cursor: pointer;
  }
  ${props => props.active && css`
    width: 46px;
    margin: 0px 7px;
    border: 2px solid #29B05A;
    line-height: 10px;
    ::before, ::after {
      top: 4px;
      width: 7px;
    }
  `}
`;
