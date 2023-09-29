import styled from 'styled-components'

export const UploadPopupWrapper = styled.div`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  font-family: SF Pro Text;
  padding: 20px 10px;
  .title {
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
  }
  .file-drag-drop {
    display: flex;
    justify-content: center;
    position: relative;
    
    .attach-file {
      position: absolute;
      left: 0; right: 0;
      top: 0; bottom: 0;
      opacity: 0;
    }
  }
  .upload-file-box {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-top: 28px;
    
    .one {
      .info {
        display: flex;
        column-gap: 5px;
        
        font-size: 12px;
        font-weight: 400;
        line-height: 10px;
        color: black;
        .name, .size, .func {
          
        }
        .name {
          flex: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .size {
          flex: 1;
        }
        
        .func {
          flex: 0.5;
          display: flex;
          column-gap: 5px;
          justify-content: flex-end;
          .btn {
            cursor: pointer;
          }
        }
      }
      .progress-bar {
        margin-top: 2px;
      }
    }
  }
  .row {
    display: flex;
    justify-content: center;
    position: relative;
    .btn {
      border: 0;
      outline: 0;
      cursor: pointer;
      color: #006FD1;
      font-family: SF Pro Text;
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
      background-color: transparent;
    }
    .btn.upload {
      width: 90px; height: 26px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #006FD1;
      border-radius: 13px;
    }
    .btn.black {
      color: black;
    }
  }
  .row.justify-end {
    justify-content: flex-end;
  }
  .row.mt-20 {
    margin-top: 20px;
  }
  .row.cursor-move {
    cursor: move;
  }
`