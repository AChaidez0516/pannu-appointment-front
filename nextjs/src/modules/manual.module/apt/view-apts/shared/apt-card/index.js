import PropTypes from 'prop-types'
import Image from 'next/image'

import { useState, useRef, useEffect } from 'react'
import moment from 'moment'
import useWindowDimensions, { DEVICE_TYPE } from '../../../../../../common/hooks/useWindowDimensions'
import Modal from '../../../../../../components/Modal'
import ConfirmModal from '../../../../../../components/modals/ConfirmModal'
import HMOComponent from '../../../make-apt/shared/HMOComponent'
import SetAlertModal from "../SetAlertModal";
import SelectHistoryTypeModal from '../SelectHistoryTypeModal'
import AppointmentHistoryModal from '../AppointmentHistoryModal'
import LocationSVG from '../../../../../../../public/assets/svgs/location.svg'
import { 
  CloseRedSVG, 
  RescheduleSVG,
  RepeatSVG
} from '../../../../../../svg-icons'
import {
  AptCardWrapper, ModalContent, Blue_Dot, Orient_Dot, Red_Dot
} from './styled'
import { IMGS, ICONS } from '../../../../../../common/utils/styleGuide'
import { useDispatch } from 'react-redux'
import { setGeneralAlertByAptId } from '../../../../../../redux/reducers/alertSlice'
import { APT_TYPE_TO_SEARCH, MEETING_TYPE } from '../data'

export default function AptCard({ apt, setApt, onViewPreparations, onViewTransactionHistory, onReschedule, onCancel, onRepeatApt, onMakeNewApt ,missed}) {
  const dispatch = useDispatch()
  const { device } = useWindowDimensions();
  const { provider, patient, testInfo, procedureInfo } = apt;
  const [selectedReasonForVisit, setSelectedReasonForVisit] = useState('');
  const [isOpenSetAlert, setIsOpenSetAlert] = useState(false);
  const [isOpenHistoryTypeModal, setIsOpenHistoryTypeModal] = useState(false);
  const [isOpenAppointmentHistoryModal, setIsOpenAppointmentHistoryModal] = useState(false);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [isMissed, setIsMissed] = useState(missed)

  const handleOpenHistoryTypeModal = () => {
    setIsOpenHistoryTypeModal(true);
  }

  const handleSelectHistoryType = (type) => {
    if (type == 'appointment') {
      setIsOpenHistoryTypeModal(false);
      setIsOpenAppointmentHistoryModal(true);
    }
    if (type == 'transaction') {
      setIsOpenHistoryTypeModal(false);
      onViewTransactionHistory(apt);
    }
  }

  const handleSetAlerts = (v) => {
    dispatch(setGeneralAlertByAptId({ aptId: apt.id, alerts: v }))
    setApt({...apt, alerts: { ...apt.alerts, general: v }})
  }
  return (
    <AptCardWrapper>      
      {testInfo && (
        <div className="test-info">
          <div>
            <div className="title">{testInfo.title}</div>
            <div className="additional-info">{testInfo.additionalInfo}</div>
          </div>
          <div>
            <div className="doctor">{testInfo.doctor}</div>
            <div className="date">{testInfo.date}</div>
          </div>
        </div>
      )}
      {procedureInfo && (
        <div className="procedure-info">
          <div>
            <div className="title">{procedureInfo.title}</div>
            <div className="additional-info">{procedureInfo.additionalInfo}</div>
          </div>
          <div>
            <div className="doctor">{procedureInfo.doctor}</div>
            <div className="date">{procedureInfo.date}</div>
          </div>
        </div>
      )}
      {apt.aptType === APT_TYPE_TO_SEARCH.PREFERRED && <Blue_Dot />}
      {apt.aptType === APT_TYPE_TO_SEARCH.URGENT && <Red_Dot />}
      {apt.aptType === APT_TYPE_TO_SEARCH.WAIT_LIST && <Orient_Dot />}
      <div className='header'>
        <div className='left'>
          <div>{provider.fullName}</div>
          <div>{provider.specialty}</div>
        </div>
        <div className='middle' onClick={() => onViewPreparations(apt)}>
          Preparations<br />& instructions
        </div>
        <div className='right'>
          <div className='save-btn'>Save</div>
          <div className='amount'>{'$XX'}</div>
        </div>
      </div>
      <div className='body'>
        <div className='left'>
          <div className="poem">POEM</div>
          <div className='avatar'>
            <div className="badge">PPO</div>
            <Image
              src={IMGS.avatarDoctor1}
              width={93} height={85}
              layout={'responsive'}
              alt='provider-avatar'
            />
            {(apt.meetingType == MEETING_TYPE.PHONE || apt.meetingType == MEETING_TYPE.VIDEO) && 
            (<div className='meeting-icons'>
             <Image src={apt.meetingType == MEETING_TYPE.PHONE?ICONS.linePhone:ICONS.camera} 
              width={15} height={10}  />
            </div>)

            }
          </div>
        </div>
        <div className='right'>
          <div className='prior-auth'>
            <div className='prior-label'>Prior authorization</div>
            <div className='prior-status pending'>Pending</div>
          </div>
          <div className='reason-for-visit'>
            <span>{apt.details.length >= 50 ? apt.details.substr(0, 50) : apt.details}</span>
            {apt.details.length >= 50 && <span className="btn" onClick={() => setSelectedReasonForVisit(apt.details)}>...More</span>}
          </div>
          <div className='facility'>
            <div className='label'>{provider.facilityName}</div>
            <a className='facility-detail' href={device == DEVICE_TYPE.DESKTOP ? "https://www.google.com/maps/search/?api=1&query="+apt.location.address : "geo:43.1494672,-76.3300194"} target="_blank">
              <div className='name'>{apt.location.address}</div>
              <div className='location-icon'>
                <LocationSVG />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className='activities'>
        <div className='meeting'>
          <div className='date-time'>{moment(new Date(apt.aptDate + ' ' + apt.aptTime)).format("MM/DD,hh:mm A")}</div>
          {(apt.meetingType == MEETING_TYPE.PHONE || apt.meetingType == MEETING_TYPE.VIDEO) && (
            <div className='join-btn'>Join meeting</div>
          )}
        </div>
        {apt.meetingType == MEETING_TYPE.ONSITE && (
          <div className='action'>
            <div className='check-in-arrival'>Scan QR code on arrival</div>
          </div>
        )}
      </div>
      {apt.aptState == 'ACTIVE' ? (
        <div className='bottom'>
          <div className='btn-unit'>
            {
              !isMissed && 
              <button
              className='transparent-btn-jin'
              onClick={() => setIsOpenSetAlert(true)}
              >
              <div className='btn-label'>Set alert</div>
            </button>              
            }                       
          </div>
          <div className='btn-unit'>
            <button
              className='transparent-btn-jin'
            >
              <div className='btn-label' onClick={handleOpenHistoryTypeModal}>History</div>
            </button>
          </div>
          <div className='btn-unit' onClick={() => setOpenConfirmRemove(true)}>
            <button
              className='transparent-btn-jin'
            >
              {
                isMissed && 
                <div>
                  <img src={IMGS.missedAptIcon} />
                </div>
              }

              <div>
                <CloseRedSVG />
              </div>
              <div className='btn-label'>Cancel</div>
            </button>
          </div>

          <div className='btn-unit' onClick={missed?onRepeatApt:onReschedule}>
            <button
              className='transparent-btn-jin'
            >
              <div>
                {missed? <RepeatSVG /> : <RescheduleSVG />}
              </div>
              <div className='btn-label'>{missed?'Repeat':'Reschedule'}</div>
            </button>
          </div>
        </div>
      ) : (
        <div className='bottom'>
          <div className='btn-unit'>
            
            <button
              className='transparent-btn-jin'
              onClick={onMakeNewApt}
            >
              <div className='btn-label'>Make new appt</div>
            </button>
          </div>
          <div className='btn-unit' style={{ textAlign: 'center' }}>
            <button
              className='transparent-btn-jin'
            >
              <div className='btn-label' onClick={handleOpenHistoryTypeModal}>History</div>
            </button>
          </div>
          <div className='btn-unit' style={{ textAlign: 'center' }}>
            <button
              className='transparent-btn-jin'
              onClick={onRepeatApt}
            >
              <RepeatSVG />
              <div className='btn-label'>Repeat</div>
            </button>
          </div>
          <div className='btn-unit' style={{ visibility: 'hidden' }}></div>
        </div>
      )}
      <Modal isOpened={selectedReasonForVisit ? true : false}>
        <ModalContent>
          <p>{selectedReasonForVisit}</p>
          <button onClick={() => setSelectedReasonForVisit('')}>Okay</button>
        </ModalContent>
      </Modal>
      <SetAlertModal
        isOpened={isOpenSetAlert}
        setIsOpened={setIsOpenSetAlert}
        alerts={apt.alerts.general}
        setAlerts={handleSetAlerts}
      />
      <SelectHistoryTypeModal
        isOpened={isOpenHistoryTypeModal}
        setIsOpened={setIsOpenHistoryTypeModal}
        onSelect={handleSelectHistoryType}
      />
      <AppointmentHistoryModal
        isOpened={isOpenAppointmentHistoryModal}
        setIsOpened={setIsOpenAppointmentHistoryModal}
        // history={apt.history.appointment}
      />
      <ConfirmModal
        open={openConfirmRemove}
        handleOk={() => { onCancel(); setOpenConfirmRemove(false); }}
        handleClose={() => setOpenConfirmRemove(false)}
        message="Are you sure you want to delete this appointment?"
        zIndex={300}
      />
    </AptCardWrapper>
  )
}

AptCard.propTypes = {
  aptTypeToSearch: PropTypes.string
}

