import styled from 'styled-components'

export const AudioRecoderWrapper = styled.div`
  padding: 10px;
  font-family: SF Pro Display;
  .container {
    display: block;
    .btn {
      cursor: pointer;
      background-color: transparent;
      border: 0; outline: 0;
      margin: 4px 0 0;
    }
    .main-section {
      display: flex;
      border: 0.5px solid #B7B7B9;
      height: 36px;
      border-radius: 18px;
      align-items: center;
      padding: 0 7px;
      justify-content: space-between;
      .line {
        width: 200px;
        margin: 0 5px;
        border-top: 1px dashed  #B7B7B9;
      }
    }
  }
`

export const VideoPopupWrapper = styled.div`
  font-family: SF Pro Display;
  
  padding: 10px;
  .attach-file {
    display: none;
  }
  .btn {
    cursor: pointer;
  }
  
  .btn-row {
    display: grid;
    margin-top: 10px;
    grid-template-columns: 1fr 1.5fr 1fr;
    .col {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
    .col.justify-center {
      justify-content: center;
    }
    .col.justify-end {
      justify-content: flex-end;
    }
  }
  .video-row {
    display: flex;
    .capture-screen {
      border: 0.5px solid #eee;
      width: 300px;
      height: 300px;
    }
  }
`
export const DevicesPopupWrapper = styled.div`
  font-family: SF Pro Display;
  padding: 10px 0;
  .item {
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
  }
  .item.selected {
    background-color: #0065FB40;
  }
  .item:hover {
    background-color: #eee;
  }
`