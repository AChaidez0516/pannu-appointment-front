import styled from 'styled-components';
import { devices } from "../../../../../../../common/constant/global";

export const ViewWrapper = styled.div`
  padding: 15px 0px 7px 0px;
  display: flex;
  margin: 25px 0px;
  height: 400px;
  @media ${devices.laptop} {
    height: 360px;
  }
  overflow: hidden auto;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
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

export const TimeslotWrapper = styled.div`
  position: relative;
  border-top: 1px dashed rgba(0, 0, 0, 0.41);
  height: ${props => props.height}px;
  .time {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 13px;
    text-align: left;
    color: #000000;
    position: absolute;
    top: -15px;
    left: 0px;
  }
  :last-child {
    height: 0px;
  }
`;
