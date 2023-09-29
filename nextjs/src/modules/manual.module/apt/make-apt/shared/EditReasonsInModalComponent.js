import styled from "styled-components"
import PropTypes from 'prop-types'
import Image from "next/image";
import { ICONS } from "../../../../../common/utils/styleGuide";

export default function EditReasonsInModalComponent(props) {
  const {
    isDisabled,
    setIsDisabled,
    reasons,
    setReasonsInModal,
    exitPastReasons,
  } = props

  return (
    <ReasonListWrapper>
      <div className="title">Select from reasons for this visit</div>
      <div className="list">
        <div className="list-header">
          <div className="row">
            <div className="reason">Reasons</div>
            <div className="action-wrapper">
              <div className="last-seen">{exitPastReasons ? 'Last seen' : null}</div>
              <div className="to-select">Select</div>
            </div>
          </div>
        </div>
        <div className="list-body">
          {reasons && Object.keys(reasons).length > 0 && reasons.map(reason => (
            <div key={reason.reasonId} className="row">
              <div className="reason">{reason?.title}</div>
              <div className="action-wrapper">
                <div className="last-seen">{reason?.lastSeenDate}</div>
                <div className="to-select">
                  {!reason?.isChangeable ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM7 14L2 9.19231L3.4 7.84615L7 11.3077L14.6 4L16 5.34615L7 14Z" fill="#A6A7A8"/>
                      </svg>                    
                    </>
                  ) : (
                    <Image
                      src={reason?.checked ? ICONS.checkOn : ICONS.checkOff}
                      width={18} height={18}
                      layout={'fixed'}
                      onClick={() => 
                        setReasonsInModal(reasons => {
                          var isChanged = false;
                          reasons.map(re => {
                            if (re.reasonId != reason.reasonId) {
                              if (re.checked == false)
                                isChanged = true;
                            } else {
                              if (re.checked == true)
                                isChanged = true;
                            }
                          })
                          if (isChanged && isDisabled == true)
                            setIsDisabled(false);
                          if (!isChanged && isDisabled == false)
                            setIsDisabled(true);
                          return reasons.map(re => re.reasonId === reason.reasonId ? ({ ...re, checked: !re.checked }) : re)
                        })}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReasonListWrapper>
  )
}

EditReasonsInModalComponent.propTypes = {
  reasons: PropTypes.array.isRequired,
  setReasonsInModal: PropTypes.func.isRequired,
  exitPastReasons: PropTypes.bool.isRequired
}

export const ReasonListWrapper = styled.div`
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
        font-size: 12px;
        line-height: 12px;
      }
    .row {
      display: flex;
      align-items: center;
      column-gap: 16px;
      justify-content: space-between;
      .reason {
        flex: 1;
        max-width: 91px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .action-wrapper {
        display: flex;
        align-items: center;
        column-gap: 26px;
        & > div {
          text-align: center;
        }
        .last-seen {
           width : 61px;
        }
        .future-apt {
          width: 74px;
        }
        .to-select {
          width: 36px;
          input[type=checkbox] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 2px solid #173FD4;
            border-radius: 2px;
          }
          input[type=checkbox]:checked {
            -webkit-appearance: revert;
            -moz-appearance: revert;
            appearance: revert;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .list-header {
      padding: 0 12px;
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