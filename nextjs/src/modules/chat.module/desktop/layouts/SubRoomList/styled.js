import styled from "styled-components";

export const SubRoomListWrapper = styled.div`
  display: grid;
  grid-auto-rows: ${(props) => props.isReduceHeight ? '46px auto' : '71px auto'};
  flex:1;
  border-right: 1px solid #c4c4c4;
  // min-height: 100vh;
  .wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 2px;
    padding-left: 9%;
    row-gap: 7px;
    overflow: hidden;
    text-overflow: ellipsis;
    
    .title {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .title.subject {
      font-weight: 600;
    }
    .check-wrapper {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 10%;
      
      INPUT[type=checkbox] {
        position: absolute;
        left: -12px;
      }
    }
    .check-wrapper:nth-child(1) {
      padding-top: 16px;
    }
  }
`