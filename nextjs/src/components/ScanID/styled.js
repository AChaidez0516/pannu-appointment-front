import styled from "styled-components";

export const ScanIDWrapper = styled.div`
  display: flex; 
  justify-content: center; 
  flex: 1;
  
  .card-wrapper {
    background: #f3f7fa;
    border: 1px dashed #173fd4;
    box-sizing: border-box;
    border-radius: 9px;
    margin-top: 30px;
    width: 200px;
    .wrapper {
      position: relative;
      width: 100%;
    }
    .card-container {
      display: flex;
      position: relative;
      flex-direction: row;
      flex: 1;
      justify-content: space-around;
      align-items: center;
      height: 115px;
      z-index: 1;
      INPUT[type=file] {
        position: absolute;
        top: 0px;
        width: 50px; height: 115px;
        opacity: 0;
      }
      INPUT[type=file].left {
        left: 0px;
      }
      INPUT[type=file].right {
        right: 0px;
      }
      .desc {
        font-family: SF Pro Text;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 14px;
        color: #000000;
      }
    }
    
    .preview {
      text-align: center;
      img {
        width: 100%;
        border-radius: 10px;  
      }
      .btn {
        border: 1px solid #173FD4;
        cursor: pointer;
        backgrond-color: transparent;
        margin-bottom: 10px;
        color: #173FD4;
      }
    }
  }
  
`