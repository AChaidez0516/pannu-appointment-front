import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: SF Pro Text;
  margin-top: 20px;
  padding: 0 10%;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .search-icon {
    cursor: pointer;
  }
  
  .list {
    margin: 14px 0 0 2px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    
    .one {
      display: flex;
      justify-content: space-between;
      .item {
        display: flex;
        column-gap: 4px;
        align-items: center;
        overflow: hidden;
      }
      .text {
        font-style: normal;
        font-weight: 400;
        color: #000000;
        cursor: pointer;
        font-size: 12px;
        line-height: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .text:hover {
        color: red!important;
      }
      .icon {
        cursor: pointer;
      }
    }
  }
  .view-more {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    column-gap: 10px;
    margin-top: 20px;
    .title {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
    }
    
    .icon {
      transform: rotateZ(90deg);
      margin-top: 3px;
    }
  }
  
  .online {
    background: #18ea64;
    width: 9px;
    height: 9px;
    border-radius: 9px;
  }
  
  .offline {
    border: 1px solid #000000;
    width: 7px;
    height: 7px;
    border-radius: 9px;
  }
`
export const Divider = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #c4c4c4;
  flex: 1;
  margin: 0 16px 0 21px;
`