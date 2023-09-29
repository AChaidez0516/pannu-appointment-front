import styled from "styled-components"
import PropTypes from 'prop-types'
import { useState } from "react"
import BusyTimeComponent from "../shared/BusyTimesComponent"


export default function ExpandBusyTimesComponent(props) {
  const {
    busyTimesProps
  } = props

  const [expandBusyTimes, setExpandBusyTimes] = useState(false)

  return (
    <ExpandBusyTimesWrapper>
      <div className='header'>
        <div className='note'>Estimated appointment duration and busy times </div>
        <div className='expand'>
          <button
            className='transparent-btn-jin'
            onClick={() => setExpandBusyTimes(!expandBusyTimes)}
          >{expandBusyTimes ? 'Collapse' : 'Expand'}</button>
        </div>
      </div>
      {expandBusyTimes &&
        <BusyTimeComponent
          setExpandBusyTimes={setExpandBusyTimes}
          {...busyTimesProps} />}
    </ExpandBusyTimesWrapper>
  )
}

ExpandBusyTimesComponent.propTypes = {
  busyTimesProps: PropTypes.object.isRequired,
}

export const ExpandBusyTimesWrapper = styled.div`
  padding: 13px 6px 12px 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .note {
      font-weight: 600;
      font-size: 12px;
      line-height: 14px;
    }
    .expand button {
      padding: 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      color: #173FD4;
      cursor: pointer;
    }
  }
`