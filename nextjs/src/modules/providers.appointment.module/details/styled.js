import styled, { css } from "styled-components";


export const DetailsWrapper = styled.div`
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
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  margin-top: 10px;
  color: #173FD4;
  text-align: center;
  ${({ isChangedApt }) => !isChangedApt && css`
    visibility: hidden;
  `}
`

export const SectionWrapper = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  padding: 7px;
  margin: 10px 0 22px 0;
  
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
`

export const ButtonWrapper = styled.div`
  margin: 40px 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  .start-btn {
    width: 86px;
    height: 40px;
    background: #F7E2A8;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .next-btn {
    font-size: 22px;
    line-height: 26px;
    color: #173FD4;
    text-align: left;
  }
`

export const ModalContent = styled.div`
  > * {
    font-family: 'SF Pro Display';
  }
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
    :disabled {
      color: #c3c3c3;
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
export const RedColored = styled.span`
  color: #D70000;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`
export const ThreadWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 395px;
  border-radius: 5px;
  z-index: 300;
  padding: 5px 35.5px;
  box-shadow: 3px 3px 3px 0px rgb(0 0 0 / 50%);
  background: linear-gradient(45deg, black, transparent);
  button {
    background: transparent;
    border: none;
    outline: none;
  }
  margin-bottom: 14px;
  @media(min-width: 1024px) {
    position: fixed;
    top: 16px;
    left: 16px;
    padding: 30px 35.5px;
    background: white;
  }
`
