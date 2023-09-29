import styled, { css } from "styled-components";

export const Typo = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  color: #000000;
  ${({ fontW }) => fontW && css`
    font-weight: ${fontW}!important;
  `}
  ${({ fontS }) => fontS && css`
    font-size: ${fontS}px;
  `}
  ${({ lineH }) => lineH && css`
    line-height: ${lineH}px;
  `}
  ${({ color }) => color && css`
    color: ${color};
  `}
  ${({ textA }) => textA && css`
    text-align: ${textA}
  `}
  ${({ margin }) => margin && css`
    margin: ${margin}
  `}
  ${({ padding }) => padding && css`
    padding: ${padding}
  `}
  ${({ noWrap }) => noWrap && css`
    white-space: nowrap
  `}
`