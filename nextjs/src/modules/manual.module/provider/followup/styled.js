import styled, { css } from "styled-components";
import { devices } from "../../../../common/constant/global";


export const FollowUpWrapper = styled.div`
  .d-flex {
    display: flex;
    align-items: center;
  }
  .j-space-between {
    justify-content: space-between;
  }
  .j-space-around {
    justify-content: space-around;
  }
  .j-start {
    justify-content: flex-start;
  }
  .gap1 {
    gap: 5px;
  }
  .gap2 {
    gap: 20px;
  }
  .gap3 {
    gap: 30px;
  }
  .search-desc {
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    width: 325px;
    margin: 10px;
  }
`

export const Summary = styled.div`
  font-weight: 500;
  border: 1px solid #8B93A6;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 4px;
  margin-top: 9px;
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line1 {
    font-size: 15px;
    font-weight: 600;
  }
  .line2 {
    font-size: 12px;
    margin-top: 10px;
  }
`

export const Subtitle = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 32px;
  margin-top: 10px;
  color: #173FD4;
  text-align: center;
`

export const Row1 = styled.div`
  background: rgba(41, 176, 90, 0.14);
  border-radius: 3px;
  height: 64px;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  margin-top: 25px;
  
  .double-check-item {
    display: flex;
    align-items: center;
    padding: 0 7px;
    background: #FFFFFF;
    border: 1px solid #8B93A6;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    height: 38px;
    width: fit-content;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    
    .check-box {
      position: absolute;
      top: -7px;
      right: -5px;
      background-color: white;
      border-radius: 50%;
      height: 20px;
      width: 20px;
    }
  }
`

export const Row2 = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`

export const Row3 = styled.div`
  margin-top: 25px;
  margin-left: 32px;
  display: flex;
  justify-content: space-between;
  .history {
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    cursor: pointer;
  }
`

export const Row4 = styled.div`
  margin-top: 25px;
  margin-left: 32px;
  display: flex;
  justify-content: space-between;
  .history {
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    cursor: pointer;
    margin: auto 0;
  }
`

export const Row6 = styled.div`
  margin-top: 30px;
  margin-left: 32px;
  display: flex;
  // justify-content: space-around;
  align-items: center;
  
  .check-label {
    font-size: 13px;
    line-height: 14px;
  }
`

export const Row8 = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  padding: 7px;
  margin: 18px 0;
  position: relative;
  
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 6px;
    margin-top: 3px;
  }
  .line {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
  }
  .edit {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: 600;
    font-size: 14px;
    line-height: 10px;
    color: #173FD4;
    cursor: pointer;
  }
`

// export const Row7 = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   margin-top: 40px;

//   .row-section1 {
//     background: rgba(41, 176, 90, 0.14);
//     border-radius: 3px;
//     .desc {
//       font-weight: 500;
//       font-size: 12px;
//       line-height: 14px;
//       margin-top: 10px;
//       margin-left: 15px;
//       display: block;
//       .bold {
//         font-weight: 600;
//       }
//     }
//   }

//   .double-check-item {
//     display: flex;
//     align-items: center;
//     padding: 0 12px;
//     margin: 15px 15px;
//     background: #FFFFFF;
//     border: 1px solid #8B93A6;
//     box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
//     border-radius: 5px;
//     height: 38px;
//     width: fit-content;
//     font-size: 12px;
//     line-height: 14px;
//     text-align: center;
//     position: relative;

//     .check-box {
//       position: absolute;
//       top: -7px;
//       right: -5px;
//       background-color: white;
//       border-radius: 50%;
//       height: 20px;
//       width: 20px;
//     }
//   }
// `

export const Row7 = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`
export const Row5 = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center:
  justify-content: center;
  .ic10codes-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    .code-wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
    }
    .code-wrapper.cptItem{
        justify-content: space-evenly;
    }
  }
  .items {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-left: 30px;
  }
  .item {
    display: flex;
    color: black;
    font-size: 12px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 10px;
    word-wrap: break-word
  }
`


export const ButtonWrapper = styled.div`
  margin: 40px 15px 0 15px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  
  .start-btn {
    width: 86px;
    height: 40px;
    background: #F7E2A8;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
  }
  .next-btn {
    font-size: 22px;
    line-height: 40px;
    color: #173FD4;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 21px;
  p {
    margin: 0 0 5px 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }
  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    background: none;
    border: none;
    outline: none;
    margin-top: 10px;
    :hover {
      cursor: pointer;
    }
  }
  .player-content {
    width: 330px;
    padding: 25px;
  }
  .time {
    border: 2px solid #BE1E2D;
    padding: 6px 10px;
    border-radius: 6px;
  }
`;

export const HistoryWrapper = styled.div`
  background-color: #FFFFFF;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 10px;
  .item {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    width: 100%;
    .action {
      width: 25%;
    }
    .name {
      width: 40%;
    }
    .date {
      //width: 10%;
    }
  }
`;

