import React from 'react';
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import styled, { css } from 'styled-components';
import useWindowDimensions, { DEVICE_TYPE } from "../../../../../common/hooks/useWindowDimensions";
import { 
  HEADER_HEIGHT, 
  MAIN_BODY_PADDING_Y, 
  SECTION_INNER_PADDING_X_DESKTOP, 
  STEP_BUTTONS_HEIGHT 
} from './constants';


export default function StepWrapperComponent(props) {
  const {
    children
  } = props

  const { width, height, device } = useWindowDimensions()

  const deviceHeight = height;
  const maxHeight = deviceHeight 
    - HEADER_HEIGHT 
    - 2 * MAIN_BODY_PADDING_Y 
    - STEP_BUTTONS_HEIGHT

  if (device === DEVICE_TYPE.DESKTOP) {
    return (
      <StepWrapper>
        <SimpleBar style={{ maxHeight: maxHeight }}>
          <ChildrenWrapper paddingX={SECTION_INNER_PADDING_X_DESKTOP}>
            {children}
          </ChildrenWrapper>
        </SimpleBar>
      </StepWrapper>
    )
  }
  return (
    <StepWrapper>
      {children}
    </StepWrapper>
  )
}

export const StepWrapper = styled.div`
  flex: 1;
`
export const ChildrenWrapper = styled.div`
  ${({ paddingX }) => paddingX && css`
    padding: 26px ${paddingX}px;
  `}
`

