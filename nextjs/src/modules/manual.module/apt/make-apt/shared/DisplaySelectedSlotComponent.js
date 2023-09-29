import styled from "styled-components"
import moment from 'moment'
import Image from "next/image"
import { useState } from "react"
import PropTypes from 'prop-types'
import ConfirmModal from "../../../../../components/modals/ConfirmModal"
import { ICONS } from "../../../../../common/utils/styleGuide"

export default function DisplaySelectedSlotComponent(props) {
  const {
    startTimeEvent,
    isRequireDelete,
    handleDeleteSlot,
  } = props

  const [openConfirmRemove, setOpenConfirmRemove] = useState(false)

  return (
    <>
      {!startTimeEvent ?
        <NoteWrapper>
          First select the appointment you want from the table above
        </NoteWrapper> :
        <Wrapper>
          <div className='date-time'>
            <div className='day-date'>
              <div className='day'>{startTimeEvent.format("dddd")}</div>
              <div className='date'>{startTimeEvent.format("MM/DD/YYYY")}</div>
            </div>
            <div className='time'>Start {startTimeEvent.format("hh:mm A")}</div>
          </div>
          {isRequireDelete && (
            <div className='delete'>
              <Image
                src={ICONS.redClose}
                width={19} height={19}
                layout={'fixed'}
                onClick={() => setOpenConfirmRemove(true)}
              />
            </div>
          )}
          <ConfirmModal
            open={openConfirmRemove}
            handleOk={() => { handleDeleteSlot(startTimeEvent); setOpenConfirmRemove(false); }}
            handleClose={() => setOpenConfirmRemove(false)}
            message="Are you sure you want to delete this appointment?"
            zIndex={300}
          />
        </Wrapper>
      }
    </>
  )
}

export const Wrapper = styled.div`
  & div {
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
  }
  display: flex;
  justify-content: space-between;
  .date-time {
    display: flex;
    align-items: center;
    column-gap: 26px;
    .day-date {
      display: flex;
      align-items: center;
      column-gap: 16px;
      .day {
        width: 70px;
      }
      .date {
        width: 70px;
      }
    }
  }
  .delete {
    cursor: pointer;
  }
`
export const NoteWrapper = styled.div`
  padding-top: 7px;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: #FF0000;
`