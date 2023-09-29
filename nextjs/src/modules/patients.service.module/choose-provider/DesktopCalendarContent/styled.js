import styled from "styled-components";


export const CalendarWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 100%;
  padding: 19px 28px;
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
    position: absolute;
    z-index: 1;
    top: -5px;
    left: -5px;
    min-height: 1000px;
  }
  .rbc-day-slot {
    .rbc-timeslot-group {
      min-height: 125px;
      border-top: 0.7px dashed #000000;
    }
  }
  .rbc-time-view {
    max-height: 619px;
    overflow-y: auto;
  }
`

export const SKWrapper = styled.div`
  width: 867px;
  height: 768px;
  padding: 19px;
`
export const SKHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 12px;
  .date-range {
    display: flex;
    justify-content: space-between;
    column-gap: 18px;
  }
  .note {
    margin-bottom: 20px;
  }
  .week-title {
    width: 100%;
    height: 38px;
  }
`
export const SKBodyWrapper = styled.div`
  
`
