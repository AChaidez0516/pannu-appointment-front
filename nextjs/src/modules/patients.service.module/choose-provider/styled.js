import styled, { css } from "styled-components";

export const ChooseProviderWrapper = styled.div`
  height: 813px;
  overflow: auto;
  position: relative;
  overflow-x: hidden;
`
export const PaddingWrapper = styled.div`
  padding: 0 8px;
`
export const SearchBox = styled.div`
  position: relative;
  width: 100%;
  .map-marker {
    position: absolute;
    top: 7px;
    left: 4px;
    cursor: pointer;
  }
  .magnify {
    position: absolute;
    top: 9px;
    right: 7px;
  }
  input {
    padding: 7px 27px;
    width: 100%;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #000000;
    background: #FFFFFF;
    border: 2px solid #000000;
    box-sizing: border-box;
    border-radius: 6px;
    &:focus {
      outline-color: #173FD4;
      img.magnify {
        color: #173FD4;
      }
    }
  }
  margin-bottom: 20px;
`
export const SlideTabWrapper = styled.div`
  padding-bottom: 28px;
  /* border-bottom: 1px dashed rgba(0, 0, 0, 0.36); */
`
export const TabContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

export const ComparePageWrapper = styled.div`
  
`
export const HeaderWrapper = styled.div`
  margin-top: 32px;
  padding: 0 11px;
  h5 {
    margin: 0;
    display: inline-block;
    margin-right: 110px;
    cursor: pointer;
  }
  span {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 11px;
    letter-spacing: -0.165px;
    color: #000000;
  }
  margin-bottom: 32px;
`
export const ComparePageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
`

