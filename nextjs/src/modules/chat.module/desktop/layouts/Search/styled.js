import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  
  .box-wrapper {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    
    background: #fdfdfd;
    border: 0.1px solid rgba(0, 0, 0, 0.36);
    box-sizing: border-box;
    border-radius: 20px;
    
    .input-wrapper {
      padding-left: 5px;
      
      INPUT {
        background: transparent;
        border: 0;
        height: 30px;
        padding: 10px;
        outline: unset;
        font-family: SF Pro Text;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        width: 100%;
        color: #000000;
      }
    }
    
    .icon {
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .search-option {
    cursor: pointer;
  }
`