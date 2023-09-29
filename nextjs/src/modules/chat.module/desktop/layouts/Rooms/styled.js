import styled from 'styled-components';

export const RoomsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0 0px;
  
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 5% 0 7.8%;
    .text {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 12px;
      color: #000000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .icon {
      margin-left: 15px;
      cursor: pointer;
    }
    .icon:nth-child(3) {
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    .one {
      display: flex;
      justify-content: space-between;
      height: 21px;
      align-items: center;
      font-family: SF Pro Text;
      cursor: pointer;
      padding-left: 7.8%;
      padding-right: 5%;
      
      .text {
        font-weight: normal;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
      }
      .show {
        display: none;
        font-size: 10px;
        font-weight: 600;
        line-height: 12px;
        color: #173FD4;
        cursor: pointer;
        align-items: center;
      }
    }
    .one.bg-light-blue {
      background-color: #CED6F1;      
    }
    .one.bg-light-red {
      background-color: #ECC7CA;
    }
    .one:hover {
      background-color: #ECC7CA;
      border: 0.5px solid #F47173;
      .show {
        display: inline-flex;
      }
    }
  }
`
export const Divider = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #c4c4c4;
  flex: 1;
  margin-left: 10px;
`