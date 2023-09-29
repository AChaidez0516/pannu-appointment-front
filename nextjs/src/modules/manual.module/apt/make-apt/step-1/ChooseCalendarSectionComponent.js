import { useRef } from 'react'
import styled from "styled-components"
import PropTypes from 'prop-types'
import Image from "next/image"
import { ICONS } from '../../../../../common/utils/styleGuide'
import { APTTYPE } from "../index/data"
import DisplaySelectedSlotComponent from "../shared/DisplaySelectedSlotComponent"

export default function ChooseCalendarSectionComponent(props) {
  const ref = useRef(null)
  const {
    calendarType,
    changeCalendarType,
    urgentDetails,
    setUrgentDetail,
    startTimeEvent,
    setStartTimeEvent,
    handleDeleteEventFromBookSlot,
    handleDeleteEventFromWaitList,
    waitList,
  } = props

  const handleChangeCalendarType = (type) => {
    changeCalendarType(type);
    if (ref.current) {
      let simplebarElement = ref.current.closest('.simplebar-content-wrapper')
      if (simplebarElement) {
        simplebarElement.scrollTop = 0
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <ChooseCalendarWrapper ref={ref}>
      <div className='title'>Select one that applies</div>
      <div className='option-group'>
        <div className='option-unit'>
          <div className='option-field'>
            <Image
              src={calendarType?.value === APTTYPE.URGENT ? ICONS.radioOn : ICONS.radioOff}
              width={20} height={20} layout={'fixed'}
              onClick={() => handleChangeCalendarType(1)}
            />
            <div
              className='label'
              onClick={() => handleChangeCalendarType(1)}
            >Urgent appointment</div>
          </div>
          {calendarType?.value === APTTYPE.URGENT &&
            <div className='sub-urgent'>
              <div className='yes-no'>
                <div className='option-group'>
                  <div>Yes</div>
                  <div>No</div>
                </div>
              </div>
              <div className='option-field'>
                <div className='label'>I need an urgent appointment</div>
                <div className='option-group'>
                    <Image
                      src={urgentDetails.needUrgentApt === undefined ? ICONS.radioOff :
                        (urgentDetails.needUrgentApt ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, needUrgentApt: true }))}
                    />
                    <Image
                      src={urgentDetails.needUrgentApt === undefined ? ICONS.radioOff :
                        (!urgentDetails.needUrgentApt ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, needUrgentApt: false }))}
                    />
                </div>
              </div>
              {urgentDetails.needUrgentApt !== undefined &&
                <div className='option-field'>
                  <div className='label'>I will go to an emergency room or urgent care if no appointment is available</div>
                  <div className='option-group'>
                    <Image
                      src={urgentDetails.willGoToEmergencyRoom === undefined ? ICONS.radioOff :
                        (urgentDetails.willGoToEmergencyRoom ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, willGoToEmergencyRoom: true }))}
                    />
                    <Image
                      src={urgentDetails.willGoToEmergencyRoom === undefined ? ICONS.radioOff :
                        (!urgentDetails.willGoToEmergencyRoom ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, willGoToEmergencyRoom: false }))}
                    />
                  </div>
                </div>
              }
              {urgentDetails.willGoToEmergencyRoom !== undefined &&
                <div className='option-field'>
                  <div className='label'>Find an urgent appointment with another provider if no available appointment with this provider</div>
                  <div className='option-group'>
                    <Image
                      src={urgentDetails.willFindAnotherProvider === undefined ? ICONS.radioOff :
                        (urgentDetails.willFindAnotherProvider ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, willFindAnotherProvider: true }))}
                    />
                    <Image
                      src={urgentDetails.willFindAnotherProvider === undefined ? ICONS.radioOff :
                        (!urgentDetails.willFindAnotherProvider ? ICONS.radioOn : ICONS.radioOff)}
                      width={20} height={20}
                      layout={'fixed'}
                      onClick={() => setUrgentDetail(prev =>
                        ({ ...prev, willFindAnotherProvider: false }))}
                    />
                  </div>
                </div>
              }
              {urgentDetails.willFindAnotherProvider !== undefined &&
                <div className='sel-slot-wrapper'>
                  <DisplaySelectedSlotComponent
                    startTimeEvent={startTimeEvent}
                    isRequireDelete={true}
                    handleDeleteSlot={handleDeleteEventFromBookSlot}
                  />
                </div>
              }
            </div>
          }
        </div>
        <div className='option-unit'>
          <div className='option-field'>
            <Image
              src={calendarType?.value === APTTYPE.PREFERRED ? ICONS.radioOn : ICONS.radioOff}
              width={20} height={20} layout={'fixed'}
              onClick={() => handleChangeCalendarType(2)}
            />
            <div
              className='label'
              onClick={() => handleChangeCalendarType(2)}
            >Show me available preferred appointments</div>
          </div>
          {calendarType?.value == APTTYPE.PREFERRED &&
            <div className='sub-regular'>
              <div className='sel-slot-wrapper'>
                <DisplaySelectedSlotComponent
                  startTimeEvent={startTimeEvent}
                  isRequireDelete={true}
                  handleDeleteSlot={handleDeleteEventFromBookSlot}
                />
              </div>
            </div>
          }
        </div>
        <div className='option-unit'>
          <div className='option-field'>
            <Image
              src={(calendarType?.value === APTTYPE.REGULAR ||
                calendarType?.value === APTTYPE.WAIT_LIST) ? ICONS.radioOn : ICONS.radioOff}
              width={20} height={20} layout={'fixed'}
              onClick={() => handleChangeCalendarType(3)}
            />
            <div
              className='label'
              onClick={() => handleChangeCalendarType(3)}
            >Selected appointment time</div>
          </div>
          {(calendarType?.value === APTTYPE.REGULAR || calendarType?.value === APTTYPE.WAIT_LIST) &&
            <div className='sub-regular'>
              <div className='sel-slot-wrapper'>
                <DisplaySelectedSlotComponent
                  startTimeEvent={startTimeEvent}
                  isRequireDelete={true}
                  handleDeleteSlot={handleDeleteEventFromBookSlot}
                />
              </div>
              {startTimeEvent && <>
                <div className='put-wait'>
                  <div className='label'>Put me on waiting list</div>
                  <Image
                    src={calendarType?.value === APTTYPE.WAIT_LIST ? ICONS.checkOn : ICONS.checkOff}
                    width={18} height={18}
                    layout={'fixed'}
                    onClick={() => {
                      const isBookedSlotEvent = startTimeEvent;
                      if (calendarType?.value === APTTYPE.REGULAR) {
                        handleChangeCalendarType(4)
                      } else {
                        handleChangeCalendarType(3)
                      }
                      setStartTimeEvent(isBookedSlotEvent)
                    }}
                  />
                </div>
                <div className='wait-list'>
                  {waitList.length > 0 &&
                    <div className='title'>Selected wait list appointments</div>}
                  <div className='sel-list'>
                    {waitList.length > 0 && waitList.map((w, i) => (
                      <DisplaySelectedSlotComponent
                        key={i}
                        startTimeEvent={w}
                        isRequireDelete={true}
                        handleDeleteSlot={handleDeleteEventFromWaitList}
                      />
                    ))}
                  </div>
                </div>
              </>}
            </div>
          }
        </div>
      </div>
    </ChooseCalendarWrapper>
  )
}

ChooseCalendarSectionComponent.propTypes = {
  calendarType: PropTypes.object.isRequired,
  changeCalendarType: PropTypes.func.isRequired,
  urgentDetails: PropTypes.object.isRequired,
  setUrgentDetail: PropTypes.func.isRequired,
  startTimeEvent: PropTypes.object,
  setStartTimeEvent: PropTypes.func.isRequired,
  handleDeleteEventFromBookSlot: PropTypes.func.isRequired,
  handleDeleteEventFromWaitList: PropTypes.func.isRequired,
  waitList: PropTypes.array.isRequired,
}

export const ChooseCalendarWrapper = styled.div`
  margin-top: 15px;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 13px;
    margin-bottom: 18px;
  }
  .option-group {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    .option-unit {
      .option-field {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .label {
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          cursor: pointer;
        }
        img {
          cursor: pointer;
        }
      }
      /** DisplaySelectedSlotComponent Wrapper */
      .sel-slot-wrapper {
        margin-top: 11px;
        margin-bottom: 16px;
        .delete {
          // display: none;
        }
      }
      /** urgent calendar case */
      .sub-urgent {
        position: relative;
        margin-top: 17px;
        padding-left: 30px;
        padding-right: 18px;
        .yes-no {
          position: absolute;
          top: -34px;
          right: 19px;
          div {
            font-weight: 500;
            font-size: 12px;
            line-height: 13px;
          }
        }
        .option-field {
          display: flex;
          align-items: center;
          column-gap: 35px;
          .label {
            flex: 1;
            font-weight: 600;
            font-size: 12px;
            line-height: 13px;
          }
          margin-bottom: 12px;
        }
        .option-group {
          width: 85px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }
      /** prefered calendar case */
      .sub-preferred {

      }
      /** regular calendar case */
      .sub-regular {
        padding-left: 30px;
        padding-right: 18px;
        .put-wait {
          margin-top: 13px;
          display: flex;
          align-items: center;
          column-gap: 20px;
          .label {
            font-weight: 600;
            font-size: 12px;
            line-height: 14px;
          }
          margin-bottom: 16px;
        }
        .wait-list {
          .title {
            font-weight: 700;
            font-size: 14px;
            line-height: 13px;
            margin-bottom: 21px;
          }
          .sel-list {
            display: flex;
            flex-direction: column;
            row-gap: 5px;
          }
        }
      }
      
    }
  }
  @media screen and (max-width: 1024px) {
    .option-group {
      .option-unit {
        .sub-regular {
          .wait-list {
            .sel-list {
              row-gap: 25px;
            }
          }
        }
      }
    }
  }
`