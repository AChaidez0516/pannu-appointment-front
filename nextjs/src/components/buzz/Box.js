import styled, { css } from "styled-components";

export const Box = styled.div`
   ${({ m }) => m && css`
    margin: ${m}px;
  `}
  ${({ mt }) => mt && css`
    margin-top: ${mt}px;
  `}
  ${({ mr }) => mr && css`
    margin-right: ${mr}px;
  `}
  ${({ mb }) => mb && css`
    margin-bottom: ${mb}px;
  `}
  ${({ ml }) => ml && css`
    margin-left: ${ml}px;
  `}
  ${({ mx }) => mx && css`
    margin: 0 ${mx}px;
  `}
  ${({ my }) => my && css`
    margin: ${my}px 0;
  `}
  ${({ margin }) => margin && css`
    margin: ${margin};
  `}

  ${({ p }) => p && css`
    padding: ${p}px;
  `}
  ${({ pt }) => pt && css`
    padding-top: ${pt}px;
  `}
  ${({ pr }) => pr && css`
    padding-right: ${pr}px;
  `}
  ${({ pb }) => pb && css`
    padding-bottom: ${pb}px;
  `}
  ${({ pl }) => pl && css`
    padding-left: ${pl}px;
  `}
  ${({ px }) => px && css`
    padding: 0 ${px}px;
  `}
  ${({ py }) => py && css`
    padding: ${py}px 0;
  `}
  ${({ padding }) => padding && css`
    padding: ${padding};
  `}
  
`