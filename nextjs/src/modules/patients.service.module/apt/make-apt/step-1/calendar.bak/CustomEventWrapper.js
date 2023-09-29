import React from 'react'
import styled, { css } from 'styled-components'


const EventWrapperContainer = styled.div`
  > div {
    min-width: 43px;
    max-height: 10px;
    background: transparent;
  }
  .rbc-event {
    border: none;
    padding: 0;
    min-height: 14.5px;
    left: 0%!important;
    .rbc-event-content {
      min-height: auto;
      > div {
        column-gap: 0px;
      }
      .text {
        flex: 0 0 30px;
      }
    }
  }
  ${({ isInWaitList }) => isInWaitList && css`
    .rbc-event {
      border: 2px solid #29B05A;  
      border-radius: 0;
    }
  `}
  ${({ isBookedSlot }) => isBookedSlot && css`
    .rbc-event {
      border-radius: 0;
      border: 2px solid #29B05A;  
      // div {
      //   color: #0065FB;
      // }
    }
  `}
  .rbc-event-label {
    display: none;
  }
  .rbc-selected {
    background-color: transparent;
    span {
      color: #29B05A;
    }
  }
`

const CustomEventWrapper = (props) => {
  const {
    event
  } = props
  return (
    <EventWrapperContainer
      isInWaitList={event?.isInWaitList}
      isBookedSlot={event?.isBookedSlot}
    >
      {props.children}
    </EventWrapperContainer>
  )
}

export default CustomEventWrapper
