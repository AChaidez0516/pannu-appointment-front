import styled from "styled-components";

export const Description = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  margin-top: 15px;
  &.mt-0 {
    margin-top: 0px;
  }
  &.big {
    font-size: 22px;
  }
  &.center {
    text-align: center;
  }
`



export const TableDiv = styled.div`
  background: rgba(23, 63, 212, 0.17);
  border-radius: 10px;
  padding: 5px;
  margin-top: 19px;
`
export const Tr = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-bottom: 5px;
  &.justify-end {
    justify-content: end;
  }
  &.header {
    border-radius: 8px 8px 0px 0px;
  }
  &.footer {
    border-radius: 0px 0px 8px 8px;
    margin-bottom: 0;
  }
  &.gray {
    background-color: #ccc;
  }
`
export const Td = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  column-gap: 5px;
  row-gap: 5px;
  &.gray {
    background-color: #ccc;
  }
  &.justify-around {
    justify-content: space-around;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-start {
    justify-content: start;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-start {
    align-items: flex-start;
  }
  &.align-end {
    align-items: flex-end;
  }
  &.align-center {
    align-items: center;
  }
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
`
export const TdText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 10px;
  color: #000000;
  &.left {
    text-align: left;
  }
  &.center {
    text-align: center;
  }
  &.right {
    text-align: right;
  }
  .calendar-wrapper {
    position: relative;
    .icon {
      position: absolute;
      right: 0;
      top: 0;
      
    }
  }
`
