import styled, { css } from "styled-components";

// shared styles of current modules
export const TimePairWrapper = styled.div`
  width: 75px;
  display: flex;
  align-items: center;
  & > * {
    flex: 1;
    font-weight: 600;
    margin: 0 auto;
  }
`
export const CellTimeWrapper = styled.div`
  position: relative;
  font-size: 11px;
  line-height: 10px;
  color: #000000;
  font-weight: 600;
  text-align: center;
  ${({ color }) => color && css`
    color: ${color};
  `}
  ${({ fontS }) => fontS && css`
    font-size: ${fontS}px;
  `}
  ${({ fontW }) => fontW && css`
    font-weight: ${fontW};
  `}
  ${({ lineH }) => lineH && css`
    line-height: ${lineH}px;
  `}
  ${({ textA }) => textA && css`
    text-align: ${textA}
  `}
`

// shared styles of current modules