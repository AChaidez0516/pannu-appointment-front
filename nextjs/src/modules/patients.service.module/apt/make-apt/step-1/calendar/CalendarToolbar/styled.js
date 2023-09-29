import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 11px;
  margin: 18px 0px;
  .current-week {
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
  }
  .calendar-icon {
    cursor: pointer;
    position: absolute;
    right: 15px;
    input {
      width: 0px;
      height: 28px;
      padding: 0px;
    }
    fieldset {
      border: none;
    }
  }
`;

export const PopoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 10px 5px 5px;
  width: ${props => props.width}px;
  //border: 1px solid #C4C4C4;
  //border-radius: 10px;
  
  .item {
    display: grid;
    grid-template-columns: 0.55fr 0.45fr;
    padding: 5px 0;
    .title {
      font-family: SF Pro Text;
      font-size: 10px;
      font-weight: 500;
      line-height: 10px;

      color: #000000;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    
    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-top: -8px; margin-right: -3px;
    }
    .mark {
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }
`