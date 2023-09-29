import styled, { css } from "styled-components";

export const SlideTabWrapper = styled.div`
  width: 100%;
  border-radius: 15px;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  ${({tabType}) => tabType && tabType === 'UNDERLINE_TAB' && css`
    box-shadow: unset;
  `}
`
export const TabItem = styled.div`
  flex: 1;
  padding: 8px 0;
  text-align: center;
  border-radius: 17px;
  background-color: white;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  cursor: pointer;
  
  

  ${({isActive}) => isActive && css`
    background-color: #173FD4;
    color: white!important;
    font-weight: 900;
  `}

  ${({tabType}) => tabType && tabType === 'UNDERLINE_TAB' && css`
    font-size: 14px;
    background: white;
    border-radius: 0;
    color: #000000!important;
    border-bottom: 1px solid #000000;
    height: 30px;
  `}
  ${({tabType, isActive}) => tabType && isActive && tabType === 'UNDERLINE_TAB' && css`
    border-bottom: 3px solid #173FD4;
    height: 32px;
    font-weight: 500;
  `}
`
