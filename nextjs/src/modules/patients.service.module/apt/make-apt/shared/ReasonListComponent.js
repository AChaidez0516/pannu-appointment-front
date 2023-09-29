import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import PreviousReasonsInModalComponent from './PreviousReasonsInModalComponent'
import AddReasonsInModalComponent from './AddReasonsInModalComponent'
import EditReasonsInModalComponent from './EditReasonsInModalComponent'
import SelectPopupModal from '../../../../../components/modals/SelectPopupModal'

export default function ReasonListComponent(props) {
  const {
    isFirstAptToDoctor,
    newReasonsToSelect,
    previousReasonsToSelect,
    setPreviousReasonsToSelect,
    selectedReasons,
    setSelectedReasons,
    isDoneSelectReasons,
    setIsDoneSelectReasons,
    exitPastReasons,
    isSubmit,
  } = props

  const [isDisabledConfirmAddReasons, setIsDisabledConfirmAddReasons] = useState(false);
  const [isDisabledConfirmEditReasons, setIsDisabledConfirmEditReasons] = useState(false);
  const [isDisabledConfirmPreviousReasons, setIsDisabledConfirmPreviousReasons] = useState(false);
  const [showEditReasonsModal, setShowEditReasonsModal] = useState(false)
  const [showAddReasonModal, setShowAddReasonModal] = useState(false)
  const [showPreviousReasonModal, setShowPreviousReasonModal] = useState(false)
  const [newReasonsInModal, setNewReasonsInModal] = useState([])
  const [previousReasonsInModal, setPreviousReasonsInModal] = useState([])
  const [selectedReasonsInModal, setSelectedReasonsInModal] = useState([])

  const handleConfirmEdit = () => {
    let newSelectedReasons = [];
    selectedReasonsInModal.map(reason => {
      reason?.checked && newSelectedReasons.push(reason)
    })
    if (!newSelectedReasons.length)
      setIsDoneSelectReasons(false);
    setSelectedReasons(newSelectedReasons)
  }
  
  const handleConfirmPrevious = () => {
    let newSelectedReasons = [];
    previousReasonsInModal.map(reason => {
      reason?.checked && newSelectedReasons.push(reason)
    })
    setSelectedReasons(newSelectedReasons)
  }

  const handleConfirmAdd = () => {
    let newSelectedReasons = [...selectedReasons];
    newReasonsInModal.map(reason => {
      if (reason?.checked) {
        let exist = selectedReasons.filter(re => re.id == reason.id)
        if (!exist.length)
          newSelectedReasons.push(reason)
      }
    })
    setSelectedReasons(newSelectedReasons)
    setNewReasonsInModal(newReasonsToSelect)
  }

  const handleCancel = () => {
    setSelectedReasons(selectedReasons)
  }

  useEffect(() => {
    if (!selectedReasons.length) {
      if (isFirstAptToDoctor) {
        setShowAddReasonModal(true)
        setIsDisabledConfirmAddReasons(true)
      } else {
        setShowPreviousReasonModal(true);
        setIsDisabledConfirmPreviousReasons(true);
      }
    } else {
      setShowAddReasonModal(false);
      setShowPreviousReasonModal(false);
    }
  }, [isFirstAptToDoctor, selectedReasons])

  useEffect(() => {
    setNewReasonsInModal(newReasonsToSelect)
  }, [newReasonsToSelect])

  useEffect(() => {
    setPreviousReasonsInModal(previousReasonsToSelect)
  }, [previousReasonsToSelect])

  useEffect(() => {
    setSelectedReasonsInModal(selectedReasons)
  }, [selectedReasons])

  return (
    <>
      <ReasonsListWrapper inactive={isSubmit && !selectedReasons.length}>
        <div className='header'>
          <div className='title'>Reasons</div>
          <div></div>
          <div className='btn-edit'>
            <button
              className='transparent-btn-jin'
              onClick={() => { setIsDisabledConfirmEditReasons(true); setShowEditReasonsModal(true); } }
            >Edit</button>
            <SelectPopupModal
              onClose={() => setShowEditReasonsModal(false)}
              show={showEditReasonsModal}
              items={[]}
              isConformButton={true}
              isConfirmDisabled={isDisabledConfirmEditReasons}
              handleConfirm={handleConfirmEdit}
              handleCancel={handleCancel}
              maxWidth={375}
            >
              <SimpleBar style={{ maxHeight: 400 }}>
                <EditReasonsInModalComponent
                  isDisabled={isDisabledConfirmEditReasons}
                  setIsDisabled={setIsDisabledConfirmEditReasons}
                  reasons={selectedReasonsInModal}
                  setReasonsInModal={setSelectedReasonsInModal}
                  exitPastReasons={exitPastReasons}
                />
              </SimpleBar>
            </SelectPopupModal>
          </div>
        </div>
        <div className='reason-list'>
          {selectedReasons.map((reason, i) => (
              <div key={i} className='reason-unit'>{reason?.title}</div>
            ))}
        </div>
        {!isDoneSelectReasons && (
          <div className='add-new'>
            <button
              className='transparent-btn-jin'
              onClick={() => { setShowAddReasonModal(true); setIsDisabledConfirmAddReasons(true); }}
            >Click here to add new reasons</button>
            <SelectPopupModal
              onClose={() => setShowAddReasonModal(false)}
              show={showAddReasonModal}
              items={[]}
              isConformButton={true}
              isConfirmDisabled={isDisabledConfirmAddReasons}
              handleConfirm={handleConfirmAdd}
              handleCancel={handleCancel}
              maxWidth={375}
            >
              <SimpleBar style={{ maxHeight: 400 }}>
                <AddReasonsInModalComponent
                  setIsDisabled={setIsDisabledConfirmAddReasons}
                  reasons={newReasonsInModal}
                  setReasons={setNewReasonsInModal}
                  exitPastReasons={exitPastReasons}
                />
              </SimpleBar>
            </SelectPopupModal>
          </div>
        )}
        <SelectPopupModal
          onClose={() => setShowPreviousReasonModal(false)}
          show={showPreviousReasonModal}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={isDisabledConfirmPreviousReasons}
          handleConfirm={handleConfirmPrevious}
          handleCancel={handleCancel}
          maxWidth={375}
        >
          <SimpleBar style={{ maxHeight: 400 }}>
            <PreviousReasonsInModalComponent
              isDisabled={isDisabledConfirmPreviousReasons}
              setIsDisabled={setIsDisabledConfirmPreviousReasons}
              reasons={previousReasonsInModal}
              setReasonsInModal={setPreviousReasonsInModal}
              exitPastReasons={exitPastReasons}
            />
          </SimpleBar>
        </SelectPopupModal>
      </ReasonsListWrapper>
      {isSubmit && !selectedReasons.length &&
        <ErrorMsg>Reasons is required*</ErrorMsg>
      }
    </>
  )
}

export const ErrorMsg = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red;
`

export const ReasonsListWrapper = styled.div`
  width: 100%;
  padding: 9px 8px;
  border: 2px solid rgba(47, 128, 237, 0.5);
  border-radius: 5px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 10px;
    }
    .btn-edit button{
      font-weight: 500;
      font-size: 14px;
      line-height: 10px;
      color: #173FD4;
    }
    margin-bottom: 11px;
  }
  .reason-list {
    padding-left: 1px;
    display: flex;
    flex-direction: column;
    row-gap: 9px;
    margin-bottom: 11px;
    .reason-unit {
      font-weight: 600;
      font-size: 12px;
      line-height: 13px;
    }
  }
  .add-new button{
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #173FD4;
    margin-bottom: 4px;
  }
  ${({ inactive }) => inactive && css`
    border: 2px solid red;
  `}
`