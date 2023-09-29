import styled from "styled-components"
import PropTypes from 'prop-types'
import DisplaySelectedSlotComponent from "../shared/DisplaySelectedSlotComponent"


export default function BookedAptInfoComponent(props) {
  const {
    calendarType,
    setCurrentStepNumber,
    startTimeEvent,
    waitList,
  } = props

  return (
    <BookedAptInfoWrapper>
      <div className='main-slot'>
        <div className='aptType-title'>
          <div className='title'>{calendarType.value == "WAIT_LIST" ? "First available appointment" : calendarType.label}</div>
          <div className='edit-btn'>
            <button
              onClick={() => setCurrentStepNumber(1)}
              className='transparent-btn-jin'
            >Edit</button>
          </div>
        </div>
        <div className='sel-slot-wrapper'>
          <DisplaySelectedSlotComponent
            isRequireDelete={false}
            startTimeEvent={startTimeEvent}
          />
        </div>
      </div>
      {calendarType?.value === 'WAIT_LIST' &&
        <div className='main-slot' style={{ marginTop: 15 }}>
          <div className='aptType-title'>
            <div className='title'>Wait listed appointments</div>
            <div className='edit-btn'>
              <button
                onClick={() => setCurrentStepNumber(1)}
                className='transparent-btn-jin'
              >Edit</button>
            </div>
          </div>
          <div className='sel-slot-wrapper'>
            <div className='wait-list'>
              {waitList.length > 0 && waitList.map((w, i) => (
                <DisplaySelectedSlotComponent
                  key={i}
                  startTimeEvent={w}
                  isRequireDelete={false}
                />
              ))}
            </div>
          </div>
        </div>
      }
    </BookedAptInfoWrapper>
  )
}

BookedAptInfoComponent.propTypes = {
  calendarType: PropTypes.object.isRequired,
  setCurrentStepNumber: PropTypes.func.isRequired,
  startTimeEvent: PropTypes.object.isRequired,
  waitList: PropTypes.array.isRequired,
}

export const BookedAptInfoWrapper = styled.div`
  .main-slot {
    padding: 9px 8px;
    border: 2px solid rgba(47,128,237,0.5);
    border-radius: 5px;
    .aptType-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 10px;
      }
      .edit-btn button{
        font-weight: 500;
        font-size: 14px;
        line-height: 10px;
        color: #173FD4;
      }
    }
    .sel-slot-wrapper {
      margin-top: 11px;
      .date-time {
        * {
          font-weight: 600;
          font-size: 12px;
          line-height: 10px;
        }
      }
      .delete {
        display: none;
      }
      .wait-list {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    }
    margin-bottom: 15px;
  }
  margin-bottom: 15px;
`