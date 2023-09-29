import styled from "styled-components";

export const MessageWrapper = styled.div`
  padding: 0px;
  
  .divider-wrapper {
    display: flex;
    align-items: center;
    padding: 2px;
    .divider {
      box-sizing: border-box;
      border-top: 1px solid #e29a9a;
      flex: 1;
      margin: 9px 10px;
    }
  }
  
  .message-box {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.8);
    margin: 9px 0;
    
    .category-wrapper {
      display: flex;
      flext-direction: row;
      align-items: center;
      position: relative;
      .un-category {
        margin-left: 20px;
      }
      .check {
        position: absolute;
        right: 5px; top: 3px;
      }
      .category {
        display: flex;
        align-items: center;
        height: 26px;
        margin-left: 0px;
        position: relative;
        padding: 0 27px 0 5px;
      }
      .category.red {
        background-color: #e29a9a;
      }
      .category.red::before {
        content: '';
        position: absolute;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        height: 0px;
        width: 0px;
        right: -10px;
        top: 0px;
        border-left: 10px solid #e29a9a;
      }
      .category.blue {
        background-color: #173fd4;
      }
      .category.blue::before {
        content: '';
        position: absolute;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        height: 0px;
        width: 0px;
        right: -10px;
        top: 0px;
        border-left: 10px solid #173fd4;
      }
      .text {
        font-family: SF Pro Text;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
      }
    }
    .category-wrapper.light-red {
      background-color: #f1ebeb;
    }
    .category-wrapper.light-blue {
      background-color: #d8dff8;
    }
  }
  .message-box.red {
    border-left: 5px solid #e29a9a;
  }
  .message-box.blue {
    border-left: 5px solid #173fd4;
  }
  .message-box.first {
    margin-bottom: 0;
  }
`
