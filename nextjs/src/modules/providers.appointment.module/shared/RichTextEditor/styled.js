import styled from "styled-components";

export const InputMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: SF Pro Text;
  position: relative;
  
  .topic-path {
    height: 60px;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    padding: 10px;
  }
  
  .input-section {
    
    background: #ffffff;
    border: 0.6px solid #c4c4c4;
    box-sizing: border-box;
    padding: 11px 12px 10px 10px;
    
    .tag-box, .reply-box, .box, .forward-box {
      display: flex;
      align-items: center;
      
      .label {       
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #5a585d;
        margin-right: 5px;
      }
    }
    .reply-box {
      .name {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        color: #5a585d;
      }
    }
    

    /**
    Draft js CSS styling
    */
    div.DraftEditor-root {
      //height: 55px;
      width: 100%;
      overflow-y: auto;
      position: relative;
    }
    div.DraftEditor-root pre {
      margin: 0!important;

    }
    div.DraftEditor-editorContainer1,
    div.public-DraftEditor-content {
      height: 100%;
      font-family: "SF Pro Display";
      font-size: 12px;
    }

    .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul, .public-DraftStyleDefault-pre {
      margin: 5px 0!important;
      line-height: 14px;
    }
    .public-DraftStyleDefault-pre {
      border: 1px solid #999;
      border-radius: 3px;
      background-color: #eee;
      line-height: 14px;
      padding: 3px 5px;
    }
    /**
    Draft js CSS styling
    */
  }
  
  .toolbar-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    padding: 5px 10px;
    
    .tool-group {
      display: flex;
      align-items: center;
      padding: 3px;
      column-gap: 27px;
      
      .btn-tool {
        cursor: pointer;
        outline: 0;
        border: 0;
        background-color: transparent;
        padding: 0;
        position: relative;
        
        .attach-file {
          opacity: 0;
          position: absolute;
          cursor: pointer;
          width: 20px;
          display: none;
        }
      }
      
      @media (max-width: 1440px) {
      }
      @media (max-width: 1280px) {
      }
    }
    
    .other-group {
      display: flex;
      align-items: center;
      column-gap: 5%;
      justify-content: flex-end;
      .desc {
        display: flex;
        align-items: center;
        column-gap: 5px;
        font-family: SF Pro Text;
        
        font-size: 9px;
        font-weight: 500;
        line-height: 11px;
        color: #5A585D;
        white-space: nowrap;
        div {
          display: flex;
          column-gap: 5px;
        }
        .border {
          width: 30px; height: 11px;
          border: 1px solid #c4c4c4;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 2px;
        }
        .icon {
          cursor: pointer;
          display: flex;
          align-items: center;
        }
      }

      .btn-group {
        display: flex;
        align-items: center;
        column-gap: 15px;
      }

      @media (max-width: 1440px) {
        column-gap: 2%;
      }
      @media (max-width: 1280px) {
        justify-content: center;
        column-gap: 5%;
      }
    }

    .other-group.justify-end {
      justify-content: flex-end;
    }
    
    /* @media (max-width: 1280px) {
      grid-template-columns: 1fr;
      row-gap: 5px;
    } */
  }
  .toolbar-section.col-1 {
    grid-template-columns: 1fr;
  }
  .overlay {
    background-color: #FFFFFF80;
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    z-index: 2;
  }
`
export const EditorBox = styled.div`
  overflow: auto;
  
  & ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  & ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  & ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  & ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  & ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
`
export const Divider = styled.div`
  box-sizing: border-box;
  border-top: 0.5px solid #eac3c3;
  flex: 1;
  margin: 5px 0;
`
export const Button = styled.div`
  border-radius: 8px;
  padding: 7px 10px;
  cursor: pointer;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 800;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  &.disabled {
    background-color: #e29a9a!important;
  }
  &.bg-red {
    background-color: #f33131;
  }
  &.bg-blue {
    background-color: blue;
  }
  &.bg-trans {
    bakckground-color: transparent;
  }
  &.cl-black {
    color: black;
  }
  &.cl-blue {
    color: blue;
  }
`
export const PopupWrapper = styled.div`
  padding: 10px;
  
`