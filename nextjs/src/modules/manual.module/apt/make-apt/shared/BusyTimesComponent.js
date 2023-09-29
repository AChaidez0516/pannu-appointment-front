import styled from "styled-components"
import Image from "next/image"
import PropTypes from 'prop-types'
import { ICONS } from '../../../../../common/utils/styleGuide'


export default function BusyTimeComponent(props) {
  const {
    busyTimes,
    lessBusyTimes,
    closedTimes,
    setExpandBusyTimes,
  } = props

  const handleArrowDown = () => {
    if (setExpandBusyTimes) {
      setExpandBusyTimes(false)
    }
  }

  return (
    <BusyTimeWrapper>
      <div className='title'>Estimated time required</div>
      <div className='content'>
        <div className='open-time'>
          <div className='sub-content left'>
            <div className='sub-title'>Busy times</div>
            <div className='time-table'>
              <div className='header'>
                <div className='row'>
                  <div className='week-name'></div>
                  <div className='from-to'>From</div>
                  <div className='from-to'>To</div>
                  <div className='duration'>
                    <div className='allow'>Allow</div>
                    <div className='hr-min'>
                      <div>Hr</div>
                      <div>Min</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='body'>
                {busyTimes && busyTimes.length > 0 && busyTimes.map(d => (
                  <div key={d.id} className='row'>
                    <div className='week-name'>{d?.day}</div>
                    <div className='from-to'>{d?.from}</div>
                    <div className='from-to'>{d?.to}</div>
                    <div className='duration'>
                      <div className='hr-min'>
                        <div>{d?.hr ? d.hr : ''}</div>
                        <div>{d?.min ? d.min : ''}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sub-content right'>
            <div className='sub-title'>Less busy times</div>
            <div className='time-table'>
              <div className='header'>
                <div className='row'>
                  <div className='week-name'></div>
                  <div className='from-to'>From</div>
                  <div className='from-to'>To</div>
                  <div className='duration'>
                    <div className='allow'>Allow</div>
                    <div className='hr-min'>
                      <div>Hr</div>
                      <div>Min</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='body'>
                {lessBusyTimes && lessBusyTimes.length > 0 && lessBusyTimes.map(d => (
                  <div key={d.id} className='row'>
                    <div className='week-name'>{d?.day}</div>
                    <div className='from-to'>{d?.from}</div>
                    <div className='from-to'>{d?.to}</div>
                    <div className='duration'>
                      <div className='hr-min'>
                        <div>{d?.hr ? d.hr : ''}</div>
                        <div>{d?.min ? d.min : ''}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='close-time'>
          <div className='sub-content left'>
            <div className='sub-title closed'>Closed</div>
            <div className='time-table'>
              <div className='header'>
                <div className='row'>
                  <div className='week-name'></div>
                  <div className='from-to'>From</div>
                  <div className='from-to'>To</div>
                  <div className='duration'>
                    <div className='allow'></div>
                    <div className='hr-min'>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='body'>
                {closedTimes && closedTimes.length > 0 && closedTimes.map(d => (
                  <div key={d.id} className='row'>
                    <div className='week-name'>{d?.day}</div>
                    <div className='from-to'>{d?.from}</div>
                    <div className='from-to'>{d?.to}</div>
                    <div className='duration'>
                      <div className='hr-min'>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="arrow-down">
        <Image
          src={ICONS.arrowDownCircle}
          width={25} height={25}
          layout={'fixed'}
          onClick={handleArrowDown}
        />
      </div> */}
    </BusyTimeWrapper>
  )
}

BusyTimeComponent.propTypes = {
  busyTimes: PropTypes.array.isRequired,
  lessBusyTimes: PropTypes.array.isRequired,
  closedTimes: PropTypes.array.isRequired,
  setExpandBusyTimes: PropTypes.func,
}

export const BusyTimeWrapper = styled.div`
  margin-top: 20px;
  margin-left: -10px;
  margin-right: -10px;
  position: relative;
  background: rgb(236, 243, 254);
  border-radius: 10px;
  padding: 16px 7px;
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 11px;
  }
  .content {
    .open-time, .close-time {
      display: flex;
    }
    .close-time {
      margin-top: 16px;
    }
    .left {
      padding-right: 12px;
    }
    .right {
      border-left: 1px solid rgba(0, 0, 0, 0.5);
      padding-left: 12px;
    }
    .sub-content {
      flex: 1;
      .sub-title {
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
      }
      .sub-title.closed {
        margin-bottom: 14px;
      }
      .time-table {
        * {
          font-weight: 600;
          font-size: 11px;
          line-height: 10px;
        }
        .row {
          display: flex;
          align-items: flex-end;
          column-gap: 4px;
          .week-name {
            font-weight: 700;
            width: 18px;
          }
          .from-to {
            width: 40px;
          }
          .duration {
            width: 45px;
            .allow {
              text-align: center;
              margin-bottom: 4px;
            }
            .hr-min {
              display: flex;
              justify-content: space-between;
            }
          }
        }
        .header {
          margin-bottom: 5px;
        }
        .body {
          .row {
            .week-name {
              font-weight: 700;
            }
            .from-to,.duration {
              font-weight: 500;
            }
            padding: 0px 0px 5px 0px;
          }
        }
      }
    }
  }
  .arrow-down {
    position: absolute;
    bottom: 15px;
    left: calc(50% - 12px);
    cursor: pointer;
  }
`