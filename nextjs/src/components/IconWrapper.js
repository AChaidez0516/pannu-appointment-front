import styled, { css } from "styled-components";

export const IconWrapper = ({ children, bgColor, length }) => {
  return (
    <Wrapper bgColor={bgColor} length={length}>
      {children}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  transition: all 220ms;;
  &:hover {
    background-color: #EFEFEF;
    ${({ bgColor }) => bgColor && css`
      background-color: ${bgColor};
    `}
  }
  ${({ length }) => length && css`
    width: ${length}px;
    height: ${length}px;
  `}
`