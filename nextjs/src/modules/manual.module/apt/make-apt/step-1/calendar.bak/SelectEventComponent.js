import Image from 'next/image'
import styled from "styled-components"
import PropTypes from 'prop-types'
import * as moment from 'moment/moment'
import { ICONS } from '../../../../../../common/utils/styleGuide'

export default function SelectEventComponent(props) {
  const {
    events,
    selectedEvent,
    setSelectedEvent
  } = props

  return (
    <EventListWrapper>
      <div className="list">
        <div className="list-body">
          {events.map(event => (
            <div key={event.id} className="row">
              <div className="event">{`${moment(event.start).format("hh:mm A")} ${moment(event.start).format("dddd")} ${moment(event.start).format("MM/DD/YYYY")}`}</div>
              <div className="action-wrapper">
                <div className="to-select">
                  <div className='option-unit'>
                    <div className='option-field'>
                      <Image
                        src={selectedEvent && selectedEvent.id == event.id ? ICONS.radioOn : ICONS.radioOff}
                        width={20} height={20} layout={'fixed'}
                        onClick={() => setSelectedEvent(event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EventListWrapper>
  )
}

SelectEventComponent.propTypes = {
  events: PropTypes.array.isRequired
}

export const EventListWrapper = styled.div`
  font-family: 'SF Pro Text';
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    padding-bottom: 9px;
    border-bottom: 0.5px solid #BBBBBE;
    margin-bottom: 10px;
    text-align: center;
  }
  .list {
    * {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
      }
    .row {
      display: flex;
      align-items: center;
      column-gap: 16px;
      justify-content: space-between;
      .event {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .action-wrapper {
        & > div {
          text-align: center;
        }
        .to-select {
          width: 36px;
        }
      }
    }
    .list-body {
      margin-top: 12px;
      background: white;
      input {
        width: 18px;
        height: 18px;
      } 
      border-radius: 9px 9px 0px 0px;
      margin-bottom: 6px;
      .row {
        padding: 14px 12px;
        border-bottom: 0.5px solid #BBBBBE;
      }
    }
  }
`