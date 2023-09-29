import { useState } from "react"
import moment from "moment"
import { toast } from "react-toastify"
import styled, { css } from "styled-components"
import { calcDuration, isWhatColor, padZero } from "../../../../common/utils/datetime"
import { ActionBtn, ActionBtnWrapper } from "../../../../components/ActionBtnWrapper"
import Modal from "../../../../components/Modal"
import { ModalContent } from "../../../providers.appointment.module/details/styled"
import { DescriptionComponent } from "../../../providers.appointment.module/shared/More"
import { RecordUnit } from "../BeginActivity"
import { AptWrapper, ReasonWrapper, SectionWrapper } from "../Home/styled"
import { mergeReasons } from "../../../../common/utils/stringHandle"
import { Box, Flex, Typo } from "../../../../components/buzz"

export const Summary = ({
  aptDetail,
  handleGoRating,
  activity,
  processList,
  setInProcess,
  goToHomeScreen,
  handleAddActualTimes,
  activityProcess,
  handleDoneSubmit,
}) => {

  const [modalDescription, setModalDescription] = useState('');

  const onClickMore = (description) => {
    setModalDescription(description);
  }

  const handleDone = async () => {
    /** store data into DB */
    handleAddActualTimes(activity?.actual, activity?.duration)
    try {
      setInProcess(false)
      await handleDoneSubmit()
      goToHomeScreen()
    } catch (error) {
      toast.error(error?.message)
    }
  }

  return (
    <div className="section">
      <SectionWrapper>
        <div>
          <AptWrapper>
            <Box mb={8}>
              <Flex x="space-between">
                <Typo fontW={500} fontS={11} lineH={14}>{aptDetail?.provider?.fullName}, MD</Typo>
                <Typo fontW={600} fontS={12} lineH={14} >{aptDetail?.provider?.specialty}</Typo>
              </Flex>
            </Box>
            <Box mb={8}>
              <Flex x="flex-start" xGap={7}>
                <Typo fontW={500} fontS={11} lineH={12} noWrap>Facility name</Typo>
                <Typo fontW={500} fontS={13} lineH={13}>{aptDetail?.provider?.facilityName}</Typo>
              </Flex>
            </Box>
            <Box mb={10}>
              <Flex x="space-between">
                <Flex x="flex-start" xGap={7}>
                  <Typo fontW={500} fontS={11} lineH={12}>Appt date</Typo>
                  <Typo fontW={500} fontS={13} lineH={10}>{aptDetail?.aptDate}</Typo>
                </Flex>
                <Flex x="flex-start" xGap={7}>
                  <Typo fontW={500} fontS={11} lineH={12}>Appt time</Typo>
                  <Typo fontW={500} fontS={13} lineH={10}>{aptDetail?.aptTime}</Typo>
                </Flex>
              </Flex>
            </Box>
            <ReasonWrapper>
              <div className="title">Reason for visit</div>
              <DescriptionComponent className="line" description={mergeReasons(aptDetail?.reasons)} onClickMore={() => onClickMore(mergeReasons(aptDetail?.reasons))} maxLength={160} />
            </ReasonWrapper>
          </AptWrapper>
          <AptSummaryWrapper>
            <div className="title">Appointment summary</div>
            <div className="performed-by">Performed By <b style={{ fontWeight: 700 }}>{aptDetail?.provider?.fullName}</b></div>
            <SummaryTblWrapper>
              <div className="xxxx">Amet minii b vm mo non deserun  minii b vm mo non deserun minii b vm mo non deserun minii b vm mo non deserun minii</div>
              <div className="time-compared">
                <Rows>
                  <div></div>
                  <Rows>
                    <Cell>Start Time</Cell>
                    <Cell>End Time</Cell>
                    <Cell>Duration</Cell>
                  </Rows>
                </Rows>
                <Rows>
                  <div>Planned</div>
                  <Rows>
                    <Cell>{activity?.planned[0]}</Cell>
                    <Cell>{activity?.planned[1]}</Cell>
                    <Cell>{activity?.duration?.planned}</Cell>
                  </Rows>
                </Rows>
                <Rows>
                  <div>Actual</div>
                  <Rows>
                    <Cell color={isWhatColor(activity?.planned[0], activity?.actual[0])}>{activity?.actual[0]}</Cell>
                    <Cell color={isWhatColor(activity?.planned[1], activity?.actual[1])}>{activity?.actual[1]}</Cell>
                    <Cell color={isWhatColor(activity?.duration?.planned, activity?.duration?.actual)}>{activity?.duration?.actual}</Cell>
                  </Rows>
                </Rows>
              </div>
            </SummaryTblWrapper>
          </AptSummaryWrapper>
          <ProcessTimes>
            {/* <RecordUnit>
              <div>{activityProcess?.title}</div>
              <div>{Math.floor(activityProcess?.duration / 60)} min</div>
            </RecordUnit> */}
            {processList && processList.filter(p => p?.present).map((p, i) => (
              <RecordUnit key={i}>
                <div style={{ color: p.color }} >{p.title}</div>
                <div>{Math.floor(p.present / 60)} min</div>
              </RecordUnit>
            ))}
          </ProcessTimes>
          <ReviewNote>
            <p>Review and comment on your experience today. </p>
            <p>Your cooperation is essential.</p>
            <p>Help other patients when making their choices and decisions, and help your provider improve their service.</p>
          </ReviewNote>
          <ActionBtnWrapper centered={true} >
            <ActionBtn
              fontS={18}
              lineH={14}
              onClick={handleGoRating}
            >Ratings, Reviews & Suggestions</ActionBtn>
          </ActionBtnWrapper>
        </div>
        <ActionBtnWrapper centered={true} >
          <ActionBtn
            fontS={18}
            lineH={14}
            onClick={handleDone}
          >Done</ActionBtn>
        </ActionBtnWrapper>
      </SectionWrapper>
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
    </div>
  )
}

export const SummaryWrapper = styled(SectionWrapper)`
  @media (min-width: 1024px) {
    padding: 27px 12px;
  }
`
export const AptSummaryWrapper = styled.div`
  .title {
    margin-top: 20px;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    margin-bottom: 18px;
  }
  .performed-by {
    font-weight: 400;
    font-size: 11px;
    line-height: 14px;
    margin-bottom: 9px;
  }
`
export const SummaryTblWrapper = styled.div`
  border: 0.7px solid #7992B1;
  border-radius: 6px;
  > * {
    font-weight: 500;
    font-size: 11px;
    line-height: 10px;
  }
  .xxxx {
    background: rgba(121, 146, 177, 0.5);
    padding: 4px 6px;
    line-height: 12px;
    border-bottom: 1px solid #7992B1;
  }
  .time-compared {
    padding: 6px 8px;
    width: 100%;
  }
  margin-bottom: 12px;
`
export const Rows = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`
export const Cell = styled.div`
  text-align: center;
  width: 60px;
  ${({ color }) => color && css`
    color: ${color};
  `}
`
export const ProcessTimes = styled.div`
  .present {
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 10px;
  }
  margin-bottom: 24px;
`
export const ReviewNote = styled.div`
  background: rgba(250, 194, 60, 0.53);
  border-radius: 5px;
  padding: 8px 10px;
  p {
    margin: 0;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 5px;
  }
  margin-bottom: 30px;
` 