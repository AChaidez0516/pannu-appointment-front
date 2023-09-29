import styled, { css } from "styled-components"


export const ProviderCardWrapper = styled.div`
  padding: 14px 8px;
  background: #FFFFFF;
  border: 0.5px solid #C4C4C4;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px #C4C4C4;
  border-radius: 5px;
  width: 350px;
  margin: 0 auto;
  ${({ maxWidth }) => maxWidth && css`
    width: 326px;
  `}
`
export const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h5 {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: #000000;
  }
  margin-bottom: 3px;
`
export const RightTitle = styled.div`
  display: flex;
  align-items: center;
  div {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 14px;
    color: #000000;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
export const StarGroup = styled.div`
  margin-right: 11px;
`

export const CardContent = styled.div`
  display: flex;
  margin-bottom: 5px;
  position: relative;
`
export const HeartFavorit = styled.div`
  position: absolute;
  right: 0;
  top: 0px;
  input {
    width: 26px;
    height: 26px;
  }
`
export const CardLeft = styled.div`
  width: 76px;
`

export const ImageWrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  div {
    position: absolute;
    left: 0px;
    top: -3px;
    width: 29px;
    height: 14px;
    background-color: #0085FE;
    border-radius: 3px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${({ isPPO }) => isPPO && css`
    & > div {
      background-color: #0085FE;
    }
  `}
  margin-bottom: 3px;
`
export const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 4px;
  div {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    color: #000000;
    text-align: center;
  }
`

export const CardRight = styled.div`
  flex: 1;
  padding-left: 6px;
  max-width: 198px;
`
export const RightItem = styled.div`
  margin-bottom: 2px;
`
export const ItemTitle = styled.div`
  font-family: 'SF Pro Text';
  font-style: italic;
  font-weight: 600;
  font-size: 11px;
  line-height: 12px;
  color: #000000;
  margin-bottom: 2px;
  ${({ underline }) => underline && css`
    text-decoration: underline;
  `}
  ${({ notItalic }) => notItalic && css`
    font-style: normal;
  `}
`
export const ItemContent = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 12px;
  color: #000000;
  ${({ pixel12 }) => pixel12 && css`
    font-size: 10px;
    letter-spacing: 0.357px;
    display: flex;
    column-gap: 3px;
    align-items: flex-end;
    .facility-name {
      width: 163px;
    }
    .mi {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 14px;
      color: #000000;
    }
  `}
`
export const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  button.moreInfo {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #173FD4;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`
export const IconGroup = styled.div`
  display: flex;
  column-gap: 8px;
  margin-right: 8px;
  button {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 13px;
    color: #173FD4;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }
`
export const Retactangle = styled.div`
  width: 20px;
  height: 15px;
  left: 16px;
  top: 438px;
  background: #FFFFFF;
  border: 0.8px solid #000000;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`
