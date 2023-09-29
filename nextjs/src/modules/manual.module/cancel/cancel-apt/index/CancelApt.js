import React, { useState } from "react"
import Image from "next/image"
import CancellationComponent from "../CancellationComponent"
import ProviderInfoComponent from "../../../../../components/ProviderInfoComponent"
import AptInfoComponent from "../../../../../components/AptInfoComponent"
import FeesComponent from "../FeesComponent"
import PolicyComponent from "../PolicyComponent"
import StepWrapperComponent from "../StepWrapperComponent"
import { ICONS, IMGS } from "../../../../../common/utils/styleGuide"
import Modal from "../../../../../components/Modal"
import HigherConfirmModal from "../../../../../components/modals/HigherConfirmModal"
import Header from "../../../../../components/Header"
import { PoliciesModalContent, FooterWrapper } from "../styled"
import { useRouter } from 'next/router'
import { cancelAppointment } from "../../../../../common/lib/appointment"

const headerTitle = "Cancel\nappointment"

const headerTitleSplitted = headerTitle.split('\n').map((line, index) => (
        <React.Fragment key={index}>
        {line}
        <br />
        </React.Fragment>
));

const modalMessage = `Once canceled, it cannot be recovered.\n\nYou will have to make a new appointment if you decide to come again later.\n\nAre you sure you want to cancel this appointment?`

const modalMessageSplitted = modalMessage.split('\n').map((line, index) => (
        <React.Fragment key={index}>
        {line}
        <br />
        </React.Fragment>
));


export default function CancelApt() {

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [openPolicies, setOpenPolicies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleCancelApt = async () => {
    setIsLoading(true)
    await cancelAppointment(2);
    setIsLoading(false);
    router.push("cancel/cancel-checked-in");
  }

  const handleDontCancelApt = () => {
    router.push("cancel/no-cancel-checked-in");
  }


  return (
    <StepWrapperComponent>
      {
        showConfirmModal && (
          <HigherConfirmModal 
            open={showConfirmModal}
            message={modalMessageSplitted}
            leftBtnText="Don’t cancel"
            rightBtnText="Cancel"
            handleOk={handleCancelApt}
            isLoading={isLoading}
            handleClose={handleDontCancelApt}
          />)
      }
      <Header 
        title={headerTitleSplitted}
        bell={20}
        types="1"
        imgsrc={IMGS.avatarMan}
      />
      <ProviderInfoComponent providerId={16} />
      <AptInfoComponent aptId={2} showRescheduleAndCancelBtns={false}/>

      <FeesComponent />
      <CancellationComponent />
      <PolicyComponent 
        onOpenPolicies={() => setOpenPolicies(true)}
      />
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
       <FooterWrapper>
          <div className="btn btn-cancel">
              <button>Cancel</button>
          </div>
          <div className="btn btn-next">
              <button onClick={() => setShowConfirmModal(true)}>Check out</button>
          </div>
      </FooterWrapper>
    </StepWrapperComponent>
  )
}
