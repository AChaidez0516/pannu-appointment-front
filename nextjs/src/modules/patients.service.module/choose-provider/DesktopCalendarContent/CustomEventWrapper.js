import React from 'react'
import styled, { css } from 'styled-components'

const EventWrapperContainer = styled.div`
  > div {
    width: 100%;
    height: 48px;
    background: white;
    border: 0.5px solid #000000;
    border-radius: 5px;
    min-width: 114px;
  }
  .rbc-event {
    overflow-y: inherit;
    overflow-x: inherit;
  }
  .rbc-event-label {
    display: none;
  }
  .rbc-selected {
    background-color: white;
    box-shadow: 0px 0px 8px #FAC23C;
    border: none;
  }
`

const CustomEventWrapper = (props) => {
  const {
    event
  } = props
  return (
    <EventWrapperContainer preSale={event.type === 'Presale'}>
      {props.children}
    </EventWrapperContainer>
  )
}

export default CustomEventWrapper
