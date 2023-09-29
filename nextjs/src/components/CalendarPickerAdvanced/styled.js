import styled from 'styled-components'

export const CalendarPickerWrapper = styled.div`
  padding: 10px;
  width: ${props => props.width};
  font-family: "SF Pro Text";
  .header {
    display: flex;
    justify-content: space-between;
    
    .cur-year-month {
      position: relative;
      display: flex;
      align-items: center;
      column-gap: 10px;
      cursor: pointer;
      padding: 5px 14px;
      border-radius: 6px;
      transition: .2s ease-in;
      :hover {
        background: #dfdfdf;
      }
      .text {
        display: flex;
        column-gap: 10px;
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.38px;
        color: #000;
      }
      .icon {
        display: flex;
        align-items: center;
        align-self: center;
        margin-top: 0px;
        transform: rotateZ(90deg);
      }

    }
    .nav {
      display: flex;
      align-items: center;
      column-gap: 8px;
      .icon {
        cursor: pointer;
        margin-top: 0px;
      }
    }
    
  
  }
  .day-wrapper {
    margin-top: 23px;
    
    .label {
      display: flex;
      justify-content:space-around;
      
      label {
        display: block;
        width: 50px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        text-align: center;
        color: #3C3C4380;

      }
    }
    .body {
      margin-top: 23px;
      .week {
        display: flex;
        justify-content: space-around;
        
        label.day {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 10px auto 10px auto;
          width: 30px;
          height: 28px;
          font-size: 16px;
          font-weight: 400;
          line-height: 21px;
          letter-spacing: -0.32px;
          text-align: center;
          color: #000;
          cursor: pointer;
        }
        label.day.today {
          border: 2px solid #173FD4;
          border-radius: 28px;
        }
        label.day.selectedDate {
          background: #173FD4;
          color: white;
          border-radius: 50%;
          border: none
        }
        label.day.invalid {
          color: #808080;
          cursor: not-allowed;
        }
        label.day.past {
          /* color: #808080;
          cursor: not-allowed; */
        }
      }
    }
  }
`
export const PopoverWrapper = styled.div`
  display: flex;
  
  font-family: "SF Pro Text";
  flex-direction: column;
  row-gap: 10px;
  padding: 17px 24px; 
  .main-container {
    display: flex;
    column-gap: 10px;    
  }
  .list-wrapper {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    padding: 10px 0;
    height: 300px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
    column-gap: 40px;
    .btn {
      border: 0; outline: 0;
      background-color: transparent;
      cursor: pointer;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: 500;
      line-height: 14px;
      color: #000;
    }
    .btn.blue {
      color: #173FD4;
    }
  }
  .scrollbar {
    overflow-y: auto;
  }
  .item {
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
  }
  .item.center {
    text-align: center;
  }
  .item:hover {
    background-color: #173FD420;
  }
  .item.selected {
    background-color: #173FD4;
    color: white;
  }
  .item.past {
    /* color: gray; */
  }
  
  .list-wrapper.year {
    width: 80px;
    
  }
  .list-wrapper.month {
    width: 100px;
  }
  .scrollbar::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  .scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  .scrollbar::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
`