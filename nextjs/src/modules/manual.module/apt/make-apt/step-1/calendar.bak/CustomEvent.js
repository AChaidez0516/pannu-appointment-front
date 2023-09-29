import styled from "styled-components"
import moment from "moment"
import PropTypes from 'prop-types'


export default function CustomEvent({ event }) {
  return (
    <EventWrapper>
      <div className="blue-bar"></div>
      <div className="text">{moment(event.start).format("hh:mm")}</div>
      <div className="blue-bar"></div>
    </EventWrapper>
  )
}

CustomEvent.propTypes = {
  event: PropTypes.object.isRequired
}


export const EventWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 2px;
  .text {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    color: #000000;
  }
  .blue-bar {
    width: 9px;
    height: 2px;
    border: 1px solid #0065FB;
  }
`