import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  padding: 0 8px;
  border-top: 1px dashed rgba(0, 0, 0, 0.36);
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
  .rbc-time-header {
    display: none;
  }
  .rbc-time-content {
    overflow-y: inherit;
  }
  .rbc-time-gutter {
    /* display: none; */
    position: absolute;
    z-index: 1;
    top: -20px;
    left: -5px;
  }
  .rbc-day-slot {
    .rbc-timeslot-group {
      min-height: 125px;
      border-top: 0.7px dashed #000000;
    }
  }
`