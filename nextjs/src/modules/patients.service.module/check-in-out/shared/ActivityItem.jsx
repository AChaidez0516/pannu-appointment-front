import { useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components"
import { calcDuration, isWhatColor } from "../../../../common/utils/datetime";
import { ICONS } from "../../../../common/utils/styleGuide";
import { IconWrapper } from "../../../../components/IconWrapper";
import { FEATURES_IN_ACTIVITIES } from "../Index/mockup";
import { CellTimeWrapper, TimePairWrapper } from "../Index/styled";
import Modal from "../../../../components/Modal";
import { ModalContent } from "../../../providers.appointment.module/details/styled";


export const ActivityItem = (props) => {
  const {
    index,
    activity,
    selectedActivity,
    handleSelectItem
  } = props

  const [modalDescription, setModalDescription] = useState('');

  const onClickMore = (description) => {
    setModalDescription(description);
  }

  const planDuration = calcDuration(activity?.planned[0], activity?.planned[1])
  const actualDuration = calcDuration(activity?.actual[0], activity?.actual[1])

  const hasFeatured = () => {
    if (activity?.featured && activity.featured !== FEATURES_IN_ACTIVITIES.WAITING) {
      let src;
      if (activity.featured === FEATURES_IN_ACTIVITIES.CANCELED) {
        src = ICONS.canceledBadge
      } else if (activity.featured === FEATURES_IN_ACTIVITIES.RESCHEDULED) {
        src = ICONS.rescheduledBadge
      } else {
        src = ICONS.canceledBadge
      }
      return <Image src={src} width={37} height={29} />
    }
    return false
  }

  const handleClickNote = (e,) => {
    e.stopPropagation()
    onClickMore(activity?.notes || 'no note')
  }

  return (
    <ActivityItemWrapper
      active={activity?.id === selectedActivity?.id}
      onClick={() => handleSelectItem(activity)}
    >
      <ActivityNameWrapper>
        <CellTimeWrapper>{index + 1}.</CellTimeWrapper>
        <CellTimeWrapper textA={'left'}>{activity?.name}</CellTimeWrapper>
      </ActivityNameWrapper>
      <ActivityTimeWrapper>
        <TimePairWrapper>
          <CellTimeWrapper>{activity?.planned[0]}</CellTimeWrapper>
          <CellTimeWrapper color={isWhatColor(activity?.planned[0], activity?.actual[0])}>{hasFeatured() || activity?.actual[0]}</CellTimeWrapper>
        </TimePairWrapper>
        <TimePairWrapper>
          <CellTimeWrapper>{activity?.planned[1]}</CellTimeWrapper>
          <CellTimeWrapper color={isWhatColor(activity?.planned[1], activity?.actual[1])} >{activity?.actual[1]}</CellTimeWrapper>
        </TimePairWrapper>
        <TimePairWrapper>
          <CellTimeWrapper>{planDuration}</CellTimeWrapper>
          <CellTimeWrapper color={isWhatColor(planDuration, actualDuration)}>{actualDuration}</CellTimeWrapper>
        </TimePairWrapper>
      </ActivityTimeWrapper>
      {activity?.notes && activity?.notes.length ? (
        <MyNotesWrapper onClick={(e) => handleClickNote(e, activity)}>
          <IconWrapper>
            <Image src={ICONS.myNotes} width={21} height={21} alt='my-notes' />
          </IconWrapper>
        </MyNotesWrapper>
      ) : null}
      <Modal isOpened={!!modalDescription}>
        <ModalContent>
          <div>
            {modalDescription && modalDescription.split("\n").map((line, index) => (
              <p key={`line${index}`}>{line}</p>
            ))}
          </div>
          <button onClick={() => setModalDescription('')}>Okay</button>
        </ModalContent>
      </Modal>
    </ActivityItemWrapper>
  )
}

export const ActivityItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 6px;
  border: 2px solid white;
  padding: 0px 5px;
  margin-bottom: 10px;
  min-height: 42px;
  transition: .2s ease-in-out;
  cursor: pointer;
  :hover {
    border: 2px solid #173FD4;
  }
  ${({ active }) => active && css`
    border: 2px solid #173FD4;
  `}
`
export const ActivityNameWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  column-gap: 5px;
`
export const ActivityTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0px;
`
export const MyNotesWrapper = styled.div`
  position: absolute;
  right: -11px;
  bottom: -14px;
`
