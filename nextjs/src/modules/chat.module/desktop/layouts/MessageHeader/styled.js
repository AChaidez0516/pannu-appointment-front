import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import InputAdornment from "@mui/material/InputAdornment";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  //column-gap: 10px;
  font-family: SF Pro Text;
  align-self: center;
  padding: 0 2.5%;
  box-sizing: border-box;
  border-bottom: 1px solid #c4c4c4;
  height: ${ (props) => props.isReduceHeight ? 46 : 71 }px;
  .col {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    
    .num {
      display: flex;
      align-items: center;
    }
    
    .text {
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      color: #000000;
      margin-left: 5px;
    }
    
    .nav {
      display: flex;
      column-gap: 7px;
      margin-left: 13px;
      margin-right: 13px;
    }
    
    SELECT {
      background: transparent;
      border: unset;
      height: 40px;
      outline: unset;
      line-height: 40px;
      margin-right: 10px;

      font-family: SF Pro Text;
      font-size: 12px;
      font-weight: 500;
      line-height: 10px;
    }
    
    .icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon.col {
      flex-direction: column;
      row-gap: 5px;
    }
    .icon.reverse {
      transform: rotateY(180deg);
    }
  }
  
  .col.extra-tools {
    @media (max-width: 1440px) {
      display: none;
    }
    .link {
      color: #173FD4;
      font-size: 8px;
      font-weight: 600;
      line-height: 10px;
      text-align: center;
      margin: 0;
    }
  }
  .col.extra-tools-menu {
    display: none;
    padding: 5px;
    cursor: pointer;
    @media (max-width: 1440px) {
      display: flex;
      align-items: center;
    }
  }
  .mt-15 {
    margin-top: 10px;
  }
`
export const AdvancedSearchBoxWrapper = styled.div`
  position: relative;
  background: #FFFFFF;

  border: 0.75px solid #173FD455;
  border-radius: 5px;
  padding: 7px 9px 6px;
  font-family: SF Pro Text;
  .desc {    
    font-size: 8px;
    font-weight: 500;
    line-height: 10px;
    color: black;
    overflow: hidden;
    p {
      margin: 0;
      
    }
  }
  .toolbar {
    display: flex;
    margin-top: 3px;
    .search-control {
      display: flex;
      flex: 1;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
      .input-wrapper {
        display: flex;
        align-items: center;
        input {
          font-family: SF Pro Text;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #000000;
          background-color: transparent;
          border: 0;
          outline: 0;
          width: 100%;
        }
      }
    }
    .search-tools {
      display: flex;
      column-gap: 10px;
      
      .link {
        color: #173FD4;
        font-size: 8px;
        font-weight: 600;
        line-height: 10px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
`
export const SearchBoxWrapper = styled.div`
  display: flex;
 
  .search-control {
    display: flex;
    position: relative;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
    margin-top: 10px;
    .input-wrapper {
      display: flex;
      align-items: center;
      input {
        font-family: SF Pro Text;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #000000;
        background-color: transparent;
        border: 0;
        outline: 0;
        width: 100%;
      }
    }
  }
  .search-tools {
    display: flex;
    column-gap: 10px;
    margin-top: 10px;

    .link {
      color: #173FD4;
      font-size: 8px;
      font-weight: 600;
      line-height: 10px;
      text-align: center;
      cursor: pointer;
    }
  }
`
// export const Search = styled(TextField)`
//   margin-left: 30px !important;
//   margin-top: -5px !important;
//
//   border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
//   & input {
//     font-family: SF Pro Text;
//     font-style: normal;
//     font-weight: 400;
//     font-size: 12px;
//     color: #000000;
//   }
// `
// export const SearchBar = styled(InputAdornment)`
//   margin-left: 3px;
// `
export const AppointmentWrapper = styled.div`
  background-color: #F3F7FA;
  position: absolute;
  flex-direction: column;
  padding: 10px 0 10px;
  display: ${props=>props.isOpened? 'block' : 'none'};
  width: 100%;
  height: 300px;
  top: 69px; right: 0;
  z-index: 1;
  .header {
    background-color: #DEE1EB;
    padding: 2px 8px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1%;
    margin: 0 10px 0 5px;
    min-width: 270px;
    
    .field {
      font-size: 9px;
      line-height: 10px;
      text-align: center;
      
    }
    .start-time {
      width: 5%;
    }
    .patient-name {
      width: 16%;
    }
    .dob {
      width: 18%;
    }
    .provider-name {
      width: 16%;
    }
    .reason {
      width: 30%;
    }
    .duration {
      width: 5%;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 10px;
    min-width: 300px;
    padding: 0 10px 10px 5px;
    
    .one {
      display: flex;
     
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      font-size: 11px;
      line-height: 10px;
      column-gap: 3px;
      height: 100px;
      margin: 0;
      padding: 5px;
      
      &.regular {
        border: 2px solid #000000;
      }
      &.current {
        border: 5px solid #FFFF00;
        border-radius: 6px;
      }
      &.urgent {
        border: 2px solid #FF0000;
        border-radius: 6px;
      }
      &.preferred {
        border: 2px solid #173FD4;
        border-radius: 6px;
      }

      .start-time.next-time {
        color: #FF0000;
      }
      .start-time {
        width: 10%;
      }
      .patient-name {
        width: 16%;
      }
      .dob {
        width: 18%;
      }
      .provider-name {
        width: 16%;
      }
      .reason {
        width: 30%;
      }
      .duration {
        width: 5%;
      }
    }
  }
  
  &.scrollbar {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    &::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.9);
    }
  }
`
export const PatientWrapper = styled.div`
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding: 10px 0 10px;
  width: 100%;
  height: 300px;
  // box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  top: ${props => props.top}px; 
  right: 0;
  border-radius: 4px;
  border: 1px solid #C9C3C3;
  display: ${props=>props.isOpened? 'block' : 'none'};
  z-index: 1;
  font-family: SF Pro Text;
  
  .bar {
    padding: 10px 10px 10px;
    border-bottom: 1px solid #C9C3C3;
    min-width: 270px;
    .desc {
      display: flex;
      column-gap: 5px;
      .txt {
        font-size: 8px;
        font-weight: 500;
        line-height: 10px;        
      }
    }
    .options {
      
      display: flex;
      margin-top: 5px;
      column-gap: 5px;
      .one {
        display: flex;
        column-gap: 7px;
        align-items: center;

        .title {
          font-family: SF Pro Text;
          font-size: 10px;
          font-weight: 500;
          line-height: 10px;

          color: #000000;
        }
      }

      .icon {
        .arrow {
          width: 4px;
          height: 4px;          
          border-left: 2px solid #000;
          border-bottom: 2px solid #000;
          transform: skewX(10deg);
        }

        transform: rotateZ(320deg)
      }
    }
  }
  .list {
    min-width: 270px;
    .one {
      display: flex;
      column-gap: 5px;
      font-size: 14px;
      font-weight: 400;
      height: 34px!important;
      align-items: center;
      padding: 0 10px;
      .name {
        color: black;
      }
      .brace {
        color: #00000055;
      }
    }
  }
  &.scrollbar {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    &::-webkit-scrollbar-thumb:active {
      background: rgba(0, 0, 0, 0.9);
    }
  }
`
export const PopoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${props => props.padding};
  width: ${props => props.width}px;

  .item {
    display: grid;
    grid-template-columns: 0.55fr 0.45fr;
    row-gap: 10px;

    .one {
      display: flex;
      column-gap: 7px;
      align-items: center;

      .title {
        font-family: SF Pro Text;
        font-size: 10px;
        font-weight: 500;
        line-height: 10px;

        color: #000000;

      }
    }
    
    .icon {
      .arrow {
        width: 6px;
        height: 6px;
        border-left: 2px solid #000;
        border-bottom: 2px solid #000;
        transform: skewX(10deg);
        
      }
      
      transform: rotateZ(320deg)
    }
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0 10px;
    
    .icon {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .mark {
      display: flex;
      align-items: center;
    }
  }

  .extra-menu-item {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    .icon {
      width: 100%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 5px 0;
    }
    .icon:hover {
      background-color: #0065FB40;
    }

    .link {
      color: #173FD4;
      font-size: 8px;
      font-weight: 600;
      line-height: 10px;
      text-align: center;
      margin: 0;
    }
  }
`