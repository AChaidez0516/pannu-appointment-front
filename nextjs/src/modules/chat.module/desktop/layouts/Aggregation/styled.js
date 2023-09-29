import styled from 'styled-components'

export const AggregationWrapper = styled.div`
  font-family: SF Pro Text;
  margin-left: 7.8%;
  margin-right: 5%;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 16px;

    .text {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 12px;
      color: #000000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .divider {
      box-sizing: border-box;
      border-top: 1px solid #c4c4c4;
      flex: 1;
      margin-left: 10px;
    }
  }
  .list {
    .one {
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      .sub-wrapper {
        display: flex;
        overflow: hidden;
        height: 24px;
        align-items: center;
        column-gap: 10px;
        .icon {
          display: flex;
          width: 20px;
          align-items: center;
        }
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
      }
      .sub-wrapper:hover {
        .text {
          color: #FF0000;
        }
      }
    }
  }
  
  
`