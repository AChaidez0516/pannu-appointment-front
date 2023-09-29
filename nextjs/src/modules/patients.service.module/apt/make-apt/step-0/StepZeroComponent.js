import PropTypes from 'prop-types'
import styled from 'styled-components'

import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'
import DetailReasonComponent from "../shared/DetailReasonComponent"
import ProviderInfoComponent from "../shared/ProviderInfoComponent"
import ReasonListComponent from "../shared/ReasonListComponent"
import BusyTimeComponent from "../shared/BusyTimesComponent"
import StepWrapperComponent from "../shared/StepWrapperComponent"
import AgreeConsultComponent from "./AgreeConsultCompontnt"
import ChooseAptTypeComponent from "./ChooseAptTypeComponent"

export default function StepZeroComponent(props) {
  const {
    provider,
    reasonListComponentProps,
    busyTimesProps,
    detailReason,
    setDetailReason,
    isVideo,
    setIsVideo,
    isPhone,
    setIsPhone,
    aptKind,
    setAptKind,
    APT_KINDS,
    isSubmit,
    isDoneSelectReasons,
    setIsDoneSelectReasons
  } = props

  const { width } = useWindowDimensions()
  const deviceWidth = width;

  const { selectedReasons } = reasonListComponentProps

  const handleDone = () => {
    if (selectedReasons.length) {
      setIsDoneSelectReasons(true);
    }
  }

  return (
    <StepWrapperComponent>
      <ProviderInfoComponent provider={provider} />
      <ReasonListComponent
        {...reasonListComponentProps}
        isSubmit={isSubmit}
      />
      {isDoneSelectReasons ?
        <>
          {deviceWidth < 1025 &&
            <div className='busy-times' style={{ margin: "10px" }}>
              <BusyTimeComponent {...busyTimesProps} />
            </div>
          }
          <DetailReasonComponent
            detailReason={detailReason}
            setDetailReason={setDetailReason}
          />
          <AgreeConsultComponent
            isVideo={isVideo}
            setIsVideo={setIsVideo}
            isPhone={isPhone}
            setIsPhone={setIsPhone}
          />
          <ChooseAptTypeComponent
            aptKind={aptKind}
            setAptKind={setAptKind}
            APT_KINDS={APT_KINDS}
            isSubmit={isSubmit}
          />
        </> :
        <DoneBtnWrapper>
          <div className='done-btn'>
            <button 
              className='transparent-btn-jin'
              disabled={selectedReasons.length ? false : true}
              onClick={handleDone}
            >Done</button>
          </div>
        </DoneBtnWrapper>
      }

    </StepWrapperComponent>
  )
}

StepZeroComponent.propTypes = {
  provider: PropTypes.object.isRequired,
  // reasonsToSelect: PropTypes.array.isRequired,
  // setReasonsToSelect: PropTypes.func.isRequired,
  // exitPastReasons: PropTypes.bool.isRequired,
  // handleAddNewReason: PropTypes.func.isRequired,
  busyTimesProps: PropTypes.object.isRequired,
  detailReason: PropTypes.string.isRequired,
  setDetailReason: PropTypes.func.isRequired,
  isVideo: PropTypes.bool.isRequired,
  setIsVideo: PropTypes.func.isRequired,
  isPhone: PropTypes.bool.isRequired,
  setIsPhone: PropTypes.func.isRequired,
  setAptKind: PropTypes.func.isRequired,
  APT_KINDS: PropTypes.array.isRequired,
  aptKind: PropTypes.object,
  isSubmit: PropTypes.bool.isRequired,
}

export const DoneBtnWrapper = styled.div`
  margin-top: 30px;
  height: 363px;
  .done-btn {
    text-align: center;
    button {
      font-weight: 500;
      font-size: 22px;
      line-height: 22px;
      color: #173FD4;
      :disabled {
        color: #A4A4A4;
      }
    }
  }
`
