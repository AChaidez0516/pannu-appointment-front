import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
  .header {
    display: flex;
    column-gap: 5px;
    padding: 0px 15px 12px 15px;
    .activity {
      flex: 5;
    }
    .provider-name {
      flex: 7;
    }
    .appointment {
      flex: 5;
    }
  }
  .list {
    margin: 0px 8px 5px 8px;
    background: #FFFFFF;
    border-radius: 9px 9px 0px 0px; 
    padding: 8px 0px;
    .item {
      display: flex;
      column-gap: 5px;
      padding: 8px;
      .activity {
        flex: 5;
      }
      .provider-name {
        flex: 7;
      }
      .appointment {
        flex: 5;
      }
    }
  }
`
