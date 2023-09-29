import { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import AptKindComponent from './AptKindComponent'
import SelectPopupModal from '../../../../../components/modals/SelectPopupModal'


export default function ChooseAptTypeComponent(props) {
  const {
    aptKind,
    setAptKind,
    APT_KINDS,
    isSubmit,
  } = props

  const [chooseAptTypeModal, setChooseAptTypeModal] = useState(false)

  return (
    <>
      <NoticeWrapper inactive={isSubmit && !aptKind}>
        <div className='notice'>
          <div className='notice-title'>
            <span>Notice: </span>The fees for premium services are charged by Pannu Corp, the service provider, and not by the healthcare provider.
          </div>
          <div className='detail'>Make your appointment request carefully.</div>
          <div className='detail'>The fees for premium services are earned and not refundable if you cancel your appointment for any reason.</div>
          <div className='detail'>Any change after this transaction is a new transaction subject to its own charge.</div>
          <div className='apt-type'>
            {!aptKind &&
              <div className='choose-apt'>
                <button
                  className='transparent-btn-jin'
                  onClick={() => setChooseAptTypeModal(true)}
                >Choose appointment type</button>
              </div>
            }
            {aptKind &&
              <div className='sel-apt'>
                <div className='left'>
                  <div className='title-note'>Selected</div>
                  <div className='selected'>{aptKind?.label}</div>
                </div>
                <div className='right'>
                  <button
                    className='transparent-btn-jin'
                    onClick={() => setChooseAptTypeModal(true)}
                  >Edit</button>
                </div>
              </div>
            }
            <SelectPopupModal
              onClose={() => setChooseAptTypeModal(false)}
              show={chooseAptTypeModal}
              items={[]}
              isConformButton={false}
            >
              <AptKindComponent
                setChooseAptTypeModal={setChooseAptTypeModal}
                aptKinds={APT_KINDS}
                setAptKind={setAptKind}
              />
            </SelectPopupModal>
          </div>
        </div>
      </NoticeWrapper>
      {isSubmit && !aptKind &&
        <ErrorMsg>Appointment type is required*</ErrorMsg>
      }
    </>
  )
}

ChooseAptTypeComponent.propTypes = {
  aptKind: PropTypes.object,
  setAptKind: PropTypes.func,
  APT_KINDS: PropTypes.array,
  isSubmit: PropTypes.bool.isRequired
}

export const ErrorMsg = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`

export const NoticeWrapper = styled.div`
  border: 2px solid #CCCCCC;
  border-radius: 5px;
  padding: 7px 10px;
  .notice {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    .notice-title {
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      span {
        display: inline;
        font-size: 14px;
        line-height: 12px;
        font-weight: 600;
      }
    }
    .detail {
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
    }
  }
  .apt-type {
    padding: 8px 0px 14px 0px;
    .choose-apt {
      text-align: center;
      button {
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: #173FD4;
      }
    }
    .sel-apt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .title-note {
          font-weight: 600;
          font-size: 14px;
          line-height: 12px;
        }
        .selected {
          font-weight: 500;
          font-size: 14px;
          line-height: 12px;
        }
      }
      .right button {
        font-weight: 500;
        font-size: 14px;
        line-height: 10px;
        color: #173FD4;
        cursor: pointer;
      }
    }
  }
  ${({ inactive }) => inactive && css`
    border: 2px solid red;
  `}
  @media screen and (max-width: 1024px) {
    .notice {
      .notice-title {
        max-width: 312px;
        font-size: 12px;
        line-height: 15px;
        span {
          font-size: 14px;
          line-height: 16px;
        }
      }
      .detail {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
`