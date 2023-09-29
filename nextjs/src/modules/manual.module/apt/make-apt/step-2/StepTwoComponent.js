import { useState } from "react"
import Image from "next/image"
import styled from "styled-components"
import PropTypes from 'prop-types'
import DetailReasonComponent from "../shared/DetailReasonComponent"
import ProviderInfoComponent from "../shared/ProviderInfoComponent"
import ReasonListComponent from "../shared/ReasonListComponent"
import BookedAptInfoComponent from "./BookedAptInfoComponent"
import TokenInfoComponent from "./TokenInfoComponent"
import CancellationComponent from "./CancellationComponent"
import FeesComponent from "./FeesComponent"
import PolicyComponent from "./PolicyComponent"
import StepWrapperComponent from "../shared/StepWrapperComponent"
import useWindowDimensions from "../../../../../common/hooks/useWindowDimensions"
import { ICONS } from "../../../../../common/utils/styleGuide";
import Modal from "../../../../../components/Modal"

export default function StepTwoComponent(props) {
  const {
    provider,
    reasonListComponentProps,
    detailReason,
    setDetailReason,
    bookedAptInfoComponentProps,
    calendarType,
    usePoem,
    setUsePoem,
    agreeTerms,
    setAgreeTerms,
    isSubmit,
    isReschedule
  } = props

  const { width } = useWindowDimensions()
  const deviceWidth = width
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false)
  const [openPolicies, setOpenPolicies] = useState(false)

  return (
    <StepWrapperComponent>
      {deviceWidth < 1025 &&
        <>
          {/* VIEW ON MOBILE */}
          <ProviderInfoComponent provider={provider} />
          <ReasonListComponent
            {...reasonListComponentProps}
          />
          <DetailReasonComponent
            detailReason={detailReason}
            setDetailReason={setDetailReason}
          />
          {/* VIEW ON MOBILE */}
        </>
      }

      {/* VIEW ON BOTH */}
      <BookedAptInfoComponent
        {...bookedAptInfoComponentProps}
      />
      <FeesComponent
        usePoem={usePoem}
        setUsePoem={setUsePoem}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        isSubmit={isSubmit}
        isReschedule={isReschedule}
        onOpenTermsAndConditions={() => setOpenTermsAndConditions(true)}
      >
        <TokenInfoComponent
          calendarType={calendarType}
        />
      </FeesComponent>
      <CancellationComponent />
      <PolicyComponent 
        onOpenPolicies={() => setOpenPolicies(true)}
      />
      <Modal isOpened={openTermsAndConditions}>
        <TermsModalContent>
          <div className="title">
            Terms and Conditions
            <div className="icon-back">
              <Image
                src={ICONS.arrowLeft}
                width={10} height={13}
                layout={'fixed'}
                quality={100}
                alt='back arrow'
                onClick={() => setOpenTermsAndConditions(false)}
              />
            </div>
          </div>
          <div className="paragraph">1. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.</div>
          <div className="paragraph">2. Appointment availability is subject to many complex and often unpredictable factors.</div>
          <div className="paragraph">3. Appointment reservation fee is fully refundable if the patient attends the appointment as scheduled.</div>
          <div className="paragraph">Refunds can be carried over to be applied towards future appointments or refunded to the original payment method, based on the patient's preference.</div>
          <div className="paragraph">See provider's cancellation policy for refunds, if any, for cancellations, no-shows and reschedules.</div>
          <div className="paragraph">4. Out-of-pocket costs e.g.</div>
          <div className="paragraph" style={{ paddingLeft: "18px" }}>-copay,<br/>-deductible,<br/>-coinsurance and<br/>-self-pay costs,<br/>are due in full before service will be provided,<br/>unless acceptable alternate arrangements e.g. POEM service, are made in advance.</div>
          <div className="paragraph">Failure to do so may result in your appointment being cancelled or rescheduled at the discretion of the provider.</div>
          <div className="paragraph">5. You will receive notifications if the appointment slot you are wait listed for becomes available. If there are other patients also wait listed for that slot, you will have 30 minutes to accept or the slot will be offered to other patients.</div>
          <div className="paragraph">6. No liability assumed by the healthcare provider or Pannu Corp, the service provider, for any direct or indirect damages as a result of using this service. </div>
          <div className="paragraph">Any damages are limited to the fees paid by you for using this service. </div>
          <div className="paragraph">7. Do not use this service if you have a true emergency. Call 911 or go to the emergency room directly. </div>
          <div className="last-paragraph">I understand these terms and conditions apply to all appointments.</div>
          <div className="btn-done" onClick={() => setOpenTermsAndConditions(false)}>Done</div>
        </TermsModalContent>
      </Modal>
      <Modal isOpened={openPolicies}>
        <PoliciesModalContent>
          <div className="title">
            Our Policies
            <div className="icon-back">
              <Image
                src={ICONS.arrowLeft}
                width={10} height={13}
                layout={'fixed'}
                quality={100}
                alt='back arrow'
                onClick={() => setOpenPolicies(false)}
              />
            </div>
          </div>
          <div className="paragraph">Lorem ipsum dolor...</div>
          <div className="btn-done" onClick={() => setOpenPolicies(false)}>Done</div>
        </PoliciesModalContent>
      </Modal>
    </StepWrapperComponent>
  )
}

StepTwoComponent.propTypes = {
  provider: PropTypes.object.isRequired,
  detailReason: PropTypes.string.isRequired,
  setDetailReason: PropTypes.func.isRequired,
  bookedAptInfoComponentProps: PropTypes.object.isRequired,
  calendarType: PropTypes.object.isRequired,
  ReasonListComponentProps: PropTypes.object,
  agreeTerms: PropTypes.bool.isRequired,
  setAgreeTerms: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool.isRequired,
}

const TermsModalContent = styled.div`
  font-family: "SF Pro Text";
  width: 100%;
  max-width: 375px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 25px 15px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 25px;
    .icon-back {
      display: none;
    }
  }
  .paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
    margin-bottom: 8px;
  }
  .last-paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 40px;
  }
  .btn-done {
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #173FD4;
  }
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    overflow-y: auto;
    padding: 60px 15px 25px 15px;
    background: white;
    .title {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      background: white;
      line-height: 50px;
      .icon-back {
        display: block;
        position: absolute;
        left: 15px;
        top: 0px;
      }
    }
  }
`;

const PoliciesModalContent = styled.div`
  font-family: "SF Pro Text";
  width: 100%;
  max-width: 375px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 25px 15px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 25px;
    .icon-back {
      display: none;
    }
  }
  .paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
    margin-bottom: 40px;
  }
  .btn-done {
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #173FD4;
  }
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    overflow-y: auto;
    padding: 60px 15px 25px 15px;
    background: white;
    .title {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      background: white;
      line-height: 50px;
      .icon-back {
        display: block;
        position: absolute;
        left: 15px;
        top: 0px;
      }
    }
  }
`;
