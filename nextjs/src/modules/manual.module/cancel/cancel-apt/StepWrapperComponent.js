import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import styled, { css } from 'styled-components';

export default function StepWrapperComponent(props) {
  const {
    children
  } = props

  return (
    <StepWrapper>
      {children}
    </StepWrapper>
  )
}

export const StepWrapper = styled.div`
  flex: 1;
  padding: 7px;
  max-width: 365px;
  background-color: #FFF;
  margin: auto;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
  }
`
export const ChildrenWrapper = styled.div`
  ${({ paddingX }) => paddingX && css`
    padding: 26px ${paddingX}px;
  `}
`

