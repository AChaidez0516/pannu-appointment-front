import styled, { css } from "styled-components";
import { GUTTER_WIDTH } from "../../index/data";


export const ErrorMsg = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: red;
`
export const CalendarWrapper = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.3);
  border-radius: 4px;
  ${({ paddingX }) => paddingX && css`
    padding: 14px ${paddingX}px;
  ` }
  width: 100%;
  .calendarType-wrapper {
    position: absolute;
    top: -15px;
    left: 15px;
  }
  h6 {
    margin-top: 12px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 19px;
  }
  & * {
    border: none;
  }
  .rbc-label {
    font-size: 10px;
  }
  .rbc-time-content {
    padding-left: ${GUTTER_WIDTH}px; // customTool 
    padding-top: 3.2px;
  }
  .rbc-time-header {
    display: none;
  }
  
  .rbc-time-gutter {
    position: absolute;
    left: -0px;
    top: 0px;
    transform: translateY(-8.5px);
  }
  .rbc-day-slot {
    .rbc-timeslot-group {
      border-top: 0.7px dashed #000000;
      min-height: 60px;
    }
    .rbc-time-slot {
      border: none;
    }
    :nth-child(7) > .rbc-events-container {
      display: none;
    }
    :nth-child(8) {
      display: none;
    }
  }
  .rbc-time-view {
    /* overflow-y: auto; */
  }
  .rbc-today {
    background: none;
  }
  .rbc-current-time-indicator {
    display: none;
  }
`
