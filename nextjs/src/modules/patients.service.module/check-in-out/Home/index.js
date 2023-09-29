import moment from 'moment';
import {
  TransactionHistoryWrapper,
  ListWrapper,
  AptWrapper,
  ReasonWrapper,
  Row1,
  AddMoreActivityWrapper,
  SectionWrapper,
  SectionWrapperBackDrop
} from './styled'
import { DescriptionComponent } from "../../../providers.appointment.module/shared/More";
import { ActivityList } from '../shared/ActivityList';
import { ActionBtn, ActionBtnWrapper } from '../../../../components/ActionBtnWrapper';
import { ActivityItem } from '../shared/ActivityItem';
import Modal from '../../../../components/Modal';
import { ModalContent } from '../../../providers.appointment.module/details/styled';
import { useState } from 'react';
import { AddMoreActivityModal } from './AddMoreActivityModal';
import { mergeReasons } from '../../../../common/utils/stringHandle';
import { Box, Flex, Typo } from '../../../../components/buzz';


export const Home = ({
  activities,
  selectedActivity,
  inProcess,
  aptDetail,
  handleSelectItem
}) => {

  const [modalDescription, setModalDescription] = useState('');
  const [openMoreActivity, setOpenMoreActivity] = useState(false)

  const onClickMore = (description) => {
    setModalDescription(description);
  }

  return (
    <div className='section'>
      <SectionWrapper>
        {/* {activity && inProcess && <SectionWrapperBackDrop /> } */}
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
          <Row1>
            <div className="row">
              <div>Estimated start time</div>
              <div>{aptDetail?.aptTime}</div>
            </div>
            <div className="row">
              <div>Estimated end time</div>
              <div>{aptDetail?.estimatedEndTime}</div>
            </div>
          </Row1>
          <AddMoreActivityWrapper>
            <div>Appointment's  calendar</div>
            <ActionBtn fontW={600} onClick={() => setOpenMoreActivity(true)}>Add more activities</ActionBtn>
          </AddMoreActivityWrapper>
          <TransactionHistoryWrapper>
            <ListWrapper>
              {activities && (
                <ActivityList>
                  {activities.map((activity, i) => (
                    <ActivityItem
                      key={i}
                      index={i}
                      activity={activity}
                      selectedActivity={selectedActivity}
                      handleSelectItem={handleSelectItem}
                    />
                  ))}
                </ActivityList>
              )}
            </ListWrapper>
          </TransactionHistoryWrapper>
        </div>
        <ActionBtnWrapper>
          <ActionBtn fontS={18} lineH={14}>Finish</ActionBtn>
        </ActionBtnWrapper>
      </SectionWrapper>
      <Modal isOpened={!!modalDescription}>
        <ModalContent>
          <div>
            {
              modalDescription && modalDescription.split("\n").map((line, index) => (
                <p key={`line${index}`}>{line}</p>
              ))
            }
          </div>
          <button onClick={() => setModalDescription('')}>Okay</button>
        </ModalContent>
      </Modal>
      <Modal isOpened={openMoreActivity}>
        <ModalContent>
          <AddMoreActivityModal />
          <button onClick={() => setOpenMoreActivity(false)}>Done</button>
        </ModalContent>
      </Modal>
    </div>
  )
}