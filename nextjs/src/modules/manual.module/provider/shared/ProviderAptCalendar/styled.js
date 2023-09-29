import styled, { css } from "styled-components";
import { TIME_INTERVAL } from ".";

const SPACE = 10; //px per time block = 10px


export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  * > {
    box-sizing: border-box;
    font-family: SF PRO TEXT;
  }
`
export const LabelWrapper = styled.div`
  margin-top: 12px;
`
export const TimeItem = styled.div`
  position: relative;
  height: ${SPACE}px;
  visibility: hidden;
  ${({ hasLabel }) => hasLabel && css`
    visibility: visible;
  `}
  :hover {
    /* background: lightcoral; */
  }
  .time {
    position: absolute;
    top: -7px;
    left: 0px;
    font-size: 10px;
    line-height: 1px;
    display: inline-block;
  }
  width: 100%;
  border-top: 1px dotted gray;
  ${({ adjustSpaceHeight }) => adjustSpaceHeight && css`
    height: 1px;
  `}
  ${({ shouldShowLabel }) => !shouldShowLabel && css`
    .time {
      display: none;
    }
  `}
`
export const AptItemWrapper = styled.div`
  width: 100%;
  height: ${props => props.duration / TIME_INTERVAL * SPACE * 3}px;
  padding: 2px 0;

`
export const AptItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  font-size: 11px;
  line-height: 10px;
  column-gap: 10px;
  height: 100%;
  margin: 0;
  padding: 5px;
  cursor: pointer;
  &.regular {
    border: 2px solid #000000;
  }
  &.urgent {
    border: 2px solid #FF0000;
    border-radius: 6px;
  }
  &.preferred {
    border: 2px solid #173FD4;
    border-radius: 6px;
  }
  &.current {
    border: 5px solid #FFFF00;
    border-radius: 6px;
  }
  .patient-name {
    width: 16%;
  }
  .dob {
    white-space: nowrap;
  }
  .provider-name {
    width: 16%;
  }
  .reason {
    width: 30%;
  }
  .duration {
    position: relative;
    text-align: center;
    width: 20px;
  }
  .ellipse {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .three-dots {
    position: absolute;
    top: -28px;
    right: -5px;
    z-index: 1;
    svg {
      cursor: pointer;
    }
  }
`
export const StartTimeWrapper = styled.div`
  width: 10%;
  ${({ isExpired }) => isExpired && css`
    color: #ff0000;
  `}
  .feature-icon {
    margin-top: 4px;
    display: inline-block;
    text-align: center;
    padding: 3px 5px;
    border: 1px solid #000000;
    border-radius: 5px;
  }
`
export const PopupWrapper = styled.div`
  font-family: 'SF Pro Text';
  padding: 0 10px;
  min-width: ${props => props.width}px;
  max-height: 300px;
  .item {
    * {
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      color: #173FD4;
    }
    display: flex;
    justify-content: space-between;
    padding: 15px 18px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #BBBBBE;
  }
  .item:hover {
    background-color: #fff;
  }
  .item.selected {
    background-color: #173FD4;
  }
  .item.selected div{
    color: white !important;
  }
  .item:first-child {
    border-radius: 9px 9px 0px 0px;
  }
  .item:last-child {
    border-bottom: none !important;
  }
`