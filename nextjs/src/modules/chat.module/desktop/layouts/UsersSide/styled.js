import styled from 'styled-components'

export const UserSideWrapper = styled.div`
  display: grid;
  grid-template-rows: ${props => props.isReduceHeight? '46px auto' : '71px auto'};
  flex: 0.9;
  font-family: SF Pro Text;
  
  .profile-wrapper {
    display: flex;
    position: relative;
    
    align-items: center;
    height: ${ (props) => props.isReduceHeight ? 46 : 71 }px;
    justify-content: flex-end;
    column-gap: 17px;
    padding: 0 10% 0;
    overflow: hidden;
    .help-icon {
      cursor: pointer;
      margin-top: 10px;
    }
    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 35px;
      margin-top: -5px;
    }
    .collapse-wrapper {
      position: absolute;
      bottom: 5px; right: 5px;
    }
  }
  
  .container {
    padding: 0 0 20px;
    overflow-x: hidden;
  }
  
  .alarm {
    
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #e85d00;
    padding-top: 15px;
    padding-bottom: 10px;
    
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .btn-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 20px 10% 0;
    .btn {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 10px;
      color: #000000;
      
      cursor: pointer;
      background: transparent;
      border: 0;
      outline: 0;
      padding: 0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  
  .divider {
    box-sizing: border-box;
    border-top: 1px solid #c4c4c4;
    flex: 1;
    margin: 22px 10% 0;
  }
  
  .dependents {
    margin-left: 7%;
    margin-top: 22px;
    background-color: white;
    border-radius: 15px 0 0 15px;
    padding: 15px 0;
    
    .title {
      padding: 0 17px;
      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 600;
      line-height: 10px;
      color: black;
    }
    
    .list {
      display: flex;
      flex-direction: column;
      row-gap: 7px;
      margin-top: 18px;
      
      .one {
        padding: 0 17px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 5px;
        .name {
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
          color: black;
          width: 23%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .sub-wrapper {
          display: flex;
          margin-bottom: 3px;
          margin-right: 2px;
          column-gap: 3px;
          overflow: hidden;
          align-items: center;
          
          .text {
            flex: 1 0 0;
            font-weight: 400;
            font-size: 12px;
            line-height: 21px;
            color: #000000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .num {
            margin-top: 1px;
            font-weight: 600;
            font-size: 9px;
            line-height: 8px;
            color: #000000;
            margin-left: 3px;
            margin-right: 5px;
          }
          .notification {
            font-weight: 500;
            font-size: 9px;
            line-height: 12px;
            color: #000000;

            padding: 2px;
            border: 1px solid #000000;
            box-sizing: border-box;
            border-radius: 3px;
          }
          .icon1 {
            display: flex;
            align-items: center;
          }
        }
        
      }
      .one:hover {
        background-color: #ECC7CA;
      }
    }

    
  }
`
