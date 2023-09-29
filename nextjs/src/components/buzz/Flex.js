import styled, { css } from "styled-components";

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ x }) => x && css`
    justify-content: ${x};
  `}
  ${({ y }) => y && css`
    align-items: ${y};
  `}
  ${({ xGap }) => xGap && css`
    column-gap: ${xGap}px;
  `}
`