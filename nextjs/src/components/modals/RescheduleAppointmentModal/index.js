import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { StyledModal, StyledModalBody, StyledModalOverlay } from "./styled";
import { RescheduledAppointmentsWrapper } from "./styled";
import { FieldWrapper } from "../../../modules/manual.module/provider/calendar/styled";
import { ClockIcon } from "../../../common/utils/Icons";
import { RESCHEDULED_PAGE_SCREENS } from "../../../modules/manual.module/provider/shared/data";
import Image from "next/image";

const mockData = [
  {
    startTime: "8:35",
    patientName: "Arlene McCoy",
    dob: "9/4/2012",
    providerName: "Jerome Bill",
    reason: "Amet minim mollit non deserunt",
    duration: "50",
  },
  {
    startTime: "8:35",
    patientName: "Arlene McCoy",
    dob: "9/4/2012",
    providerName: "Jerome Bill",
    reason: "Amet minim mollit non deserunt",
    duration: "50",
  },
  {
    startTime: "8:35",
    patientName: "Arlene McCoy",
    dob: "9/4/2012",
    providerName: "Jerome Bill",
    reason: "Amet minim mollit non deserunt",
    duration: "50",
  },
  {
    startTime: "8:35",
    patientName: "Arlene McCoy",
    dob: "9/4/2012",
    providerName: "Jerome Bill",
    reason: "Amet minim mollit non deserunt",
    duration: "50",
  },
  {
    startTime: "8:35",
    patientName: "Arlene McCoy",
    dob: "9/4/2012",
    providerName: "Jerome Bill",
    reason: "Amet minim mollit non deserunt",
    duration: "50",
  },
];

const RescheduledAppointmentsModal = ({
  show,
  type,
  onClose,
  maxWidth = 450,
  padding = "0px",
  zIndex = 200,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(
    RESCHEDULED_PAGE_SCREENS.HOME
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (show) {
      const htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.style.overflowY = "hidden";
    } else {
      const htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.style.overflowY = "auto";
    }
  }, [show]);

  const handleBack = () => {
    switch (currentScreen) {
      case RESCHEDULED_PAGE_SCREENS.HOME:
        onClose();
        break;
      case RESCHEDULED_PAGE_SCREENS.HISTORY:
        setCurrentScreen(RESCHEDULED_PAGE_SCREENS.HOME);
        break;
      default:
        break;
    }
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal maxWidth={maxWidth} padding={padding}>
        <StyledModalBody>
          <RescheduledAppointmentsWrapper>
            {currentScreen == RESCHEDULED_PAGE_SCREENS.HOME ? (
              <>
                <div className="title">
                  {type
                    ? type.charAt(0).toUpperCase() + type.slice(1)
                    : "Rescheduled"}
                </div>
                <FieldWrapper>
                  <span className="start-time">
                    <ClockIcon color="#173FD4" />
                  </span>
                  <span className="field patient-name">Name</span>
                  <span className="field dob">DOB</span>
                  <span className="field provider_name">Provider</span>
                  <span className="field reason">Reason</span>
                  <Image
                    className="duration"
                    src="/assets/images/sand-clock.png"
                    width="21"
                    height="21"
                  />
                </FieldWrapper>
                <div className="content">
                  {mockData.map((d, i) => (
                    <div
                      className="content-item"
                      style={{
                        borderBottom:
                          i == mockData.length - 1
                            ? "none"
                            : "0.5px solid #bbbbbe",
                      }}
                      onClick={() =>
                        setCurrentScreen(RESCHEDULED_PAGE_SCREENS.HISTORY)
                      }
                    >
                      <span className="start-time">{d.startTime}</span>
                      <span className="patient-name">{d.patientName}</span>
                      <span className="dob">{d.dob}</span>
                      <span className="provider-name">{d.providerName}</span>
                      <span className="reason">{d.reason}</span>
                      <span className="duration">{d.duration}</span>
                    </div>
                  ))}
                  <div></div>
                </div>
              </>
            ) : (
              <>
                {/*=========================== need to be updated ==============================*/}
                <div className="content">
                  <div className="history-item">
                    <span className="status">Start</span>
                    <span className="provider-name">Leslie Alexander</span>
                    <span className="date">05/21</span>
                  </div>
                  <div className="history-item">
                    <span className="status">Rescheduled</span>
                    <span className="provider-name">Leslie Alexander</span>
                    <span className="date">06/21</span>
                  </div>
                  <div className="history-item">
                    <span className="status">Cancelled</span>
                    <span className="provider-name">Leslie Alexander</span>
                    <span className="date">07/21</span>
                  </div>
                  <div className="history-item">
                    <span className="status">Repeat</span>
                    <span className="provider-name">Leslie Alexander</span>
                    <span className="date">08/21</span>
                  </div>
                </div>
              </>
            )}
            <div className="done" onClick={handleBack}>
              Done
            </div>
          </RescheduledAppointmentsWrapper>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    if (show)
      document.getElementById("modal-root").parentNode.style.zIndex = zIndex;
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default RescheduledAppointmentsModal;
