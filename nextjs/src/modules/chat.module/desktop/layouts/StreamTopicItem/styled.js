import styled from "styled-components";

export const Side = styled.div`
  display: flex;
  align-items: center;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  line-height: 21px;
  height: 21px;
  .container {
    display: flex;
    align-items: center;
    
    overflow: hidden;
    
    .title {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
      cursor: pointer;
      
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      display: flex;
      align-items: center;
    }
    .notification {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 500;
      font-size: 9px;
      line-height: 12px;
      color: #000000;

      padding: 2px;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 3px;
    }
    .number {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 600;
      font-size: 9px;
      line-height: 8px;
      color: #000000;
      margin-left: 3px;
      margin-right: 5px;

      display: flex;
      align-items: center;
    }
  }


`