import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Radio, Checkbox } from "@mui/material";

import {
  Summary,
  ModalContent,
  ButtonWrapper,
  Row1,
  Row2,
  Row3,
  Row4,
  Row5,
  Row6,
  Row7,
  Row8,
  HistoryWrapper,
  FollowUpWrapper,
} from "./styled";
import {
  CalendarIcon,
  CircleCheckIcon,
  ClockIcon,
  VectorIcon,
} from "../../../../common/utils/Icons";
import useWindowDimensions, {
  DEVICE_TYPE,
} from "../../../../common/hooks/useWindowDimensions";
import { MAIN_BODY_PADDING_Y } from "../../../patients.service.module/apt/make-apt/shared/constants";
import Modal from "../../../../components/Modal";
import { DescriptionComponent } from "../shared/More";
import SelectPopup from "../../../../components/SelectPopup";
import {
  numberItems,
  numberOptions,
  periodItems,
  periodOptions,
  priorityItems,
  priorityOptions,
  ICDOptions,
  virtualVisitItems,
  virtualVisitOptions,
  appointmentOptions,
} from "./options";
import TimePicker from "../../../../components/Time";
import InputBox from "../../../../components/InputBox";
import SelectPopupModal from "../../../../components/modals/SelectPopupModal";
import Preparations from "../shared/Preparations";
import Reasons from "../shared/Reasons";
import {
  fakePreparations,
  fakeInstructions,
  fakePreviousHistory,
  fakeReasons,
} from "./data";
import {
  getPreparationsAndInstructionsAndReasons,
  updateFollowUpAppointment,
} from "../../../../common/lib/appointment";
import {
  ActionBtn,
  ActionBtnWrapper,
} from "../../../../components/ActionBtnWrapper";
import { Box, Notification } from "../../../../components/buzz";
import { EDITOR_TYPE } from "../shared/data";
import { getTimeFromApt } from "../../../../common/utils/datetime";
import { CalendarPickerAdvanced } from "../../../../components/CalendarPickerAdvanced";
import { mergeReasons } from "../../../../common/utils/stringHandle";
import { ICONS } from "../../../../common/utils/styleGuide";
import moment from "moment";
import { SectionHeader } from "../shared/SectionHeader";
import { useGetAllICD10Codes } from "../../../../common/hooks/useGetAllICD10Codes";
import { useGetAllCPTCodes } from "../../../../common/hooks/useGetAllCPTCodes";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function FollowUpAppointment({
  aptDetails,
  setAptDetail,
  goToDetails,
  goToHomeScreen,
  isMock,
  setIsChangedApt,
  title,
  onArrowBack,
  editBox,
  setEditBox,
  setNewTitle,
}) {
  const router = useRouter();
  const { height, device } = useWindowDimensions();
  const sectionHeight = height - 2 * MAIN_BODY_PADDING_Y;
  const iconColor = "#29B05A";

  const [modalDescription, setModalDescription] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({
    opened: false,
  });
  const [showPreparationsModal, setShowPreparationsModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showFormsModal, setShowFormsModal] = useState(false);
  const [showReasonsModal, setShowReasonsModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [newPreparations, setNewPreparations] = useState([]);
  const [_preparationIds, _setPreparationIds] = useState([]);
  const [newInstructions, setNewInstructions] = useState([]);
  const [_instructionIds, _setInstructionIds] = useState([]);
  const [newForms, setNewForms] = useState([]);
  const [_formsIds, _setFormsIds] = useState([]);
  const [newReasons, setNewReasons] = useState([]);
  const [_reasonIds, _setReasonIds] = useState([]);
  const [addNewItemCheck, setAddNewItemCheck] = useState(false);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [formData, setFormData] = useState({
    isNormalDate: false,
    aptDate: null,
    aptTime: "",
    aptWMD: "",
    aptWMDNumber: "",
    virtualVisit: "",
    duration: 0,
    priority: "",
    cantBeChanged: false,
    isReschedule: false,
    reasons: [],
    tasks: [],
    resourceNotes: [],
    refillMedicines: [],
    reorderTests: [],
    myNotes: [],
    cptCodesFormData: "",
    icd10CodesFormData: ""
  });

  useEffect(() => {
    if (!isMock) {
      const checkIfIncluded = (allItems, someItems) => {
        if (!allItems || !allItems.length) return [];
        if (!someItems || !someItems.length) return allItems;
        return allItems.map((a) =>
          someItems.find((s) => s?.id === a?.id) ? { ...a, checked: true } : a
        );
      };
      const fetchPreparationInstructionReasonsByProviderId = async () => {
        try {
          const providerId = aptDetails.providerUserId;
          const res = await getPreparationsAndInstructionsAndReasons(
            providerId
          );
          setNewPreparations(res.preparations);
          setNewInstructions(res.instructions);
  
          setNewReasons(checkIfIncluded(res.reasons, aptDetails.reasons));
        } catch (error) {
          console.log(error);
        } finally {
        }
      };
      fetchPreparationInstructionReasonsByProviderId();
    } else {
      setNewPreparations(fakePreparations);
      setNewInstructions(fakeInstructions);
      setNewReasons(fakeReasons);
    }
  }, []);
  useEffect(() => {
    if (editBox.show) {
      setShowPreparationsModal(false);
      setShowInstructionsModal(false);
    }
  }, [editBox.show]);
  useEffect(() => {
    setAptDetail({
      ...aptDetails,
      preparations: newPreparations.filter((v) => v.checked),
      instructions: newInstructions.filter((v) => v.checked),
      reasons: newReasons.filter((v) => v.checked),
    });
  }, [newPreparations, newInstructions, newReasons]);
  useEffect(() => {
    setIsChangedApt(false); // or true if what changed
  }, [newPreparations, newInstructions]);

  const onClickMore = (description) => {
    setModalDescription(description);
  };

  const handleOptionChange = (event) => {
    setFormData({
      ...formData,
      isNormalDate: event.target.value === "datetime",
    });
  };

  const onSelectDate = (y, m, d) => {
    setSelectedDate(new Date(y, m - 1, d));
  };
  const handleSelectDate = () => {
    if (selectedDate) {
      setFormData({ ...formData, aptDate: selectedDate });
    }
  };

  const displaySelectedDate = (dateInstance) => {
    if (!dateInstance) return "";
    const wday = weekday[dateInstance.getDay()].slice(0, 2);
    const m = dateInstance.getMonth() + 1;
    const d = dateInstance.getDate();
    return `${wday} ${m}/${d}`;
  };

  const controlProps = (item) => ({
    checked:
      item === "datetime" ? formData.isNormalDate : !formData.isNormalDate,
    onChange: handleOptionChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleSelectDateOption = (isNormalDate) => {
    setFormData({ ...formData, isNormalDate });
  };

  const handleConfirmAdd = () => {
    if (addNewItemCheck) {
      setEditBox({ ...editBox, show: true });
    }
  };

  const handleCancel = () => {
    // setSelectedReasons(selectedReasons)
  };

  const saveAppointment = async () => {
    setAptDetail(aptDetails);
    try {
      const updatedApt = aptDetails;
      updatedApt.followUp = {
        // noteToProvider: noteToProvider,
        // patientNotes: [],
        // followupType: scheduleOption,
        // followupDate: aptDate,
        // followupTime: aptTime,
        // followupWeek: formData.aptWMD === 'w' ? aptWMDNumber : null,
        // followupMonth: formData.aptWMD === 'm' ? aptWMDNumber : null,
        // followupDay: formData.aptWMD === 'd' ? aptWMDNumber : null,
      };

      const res = await updateFollowUpAppointment(updatedApt);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleGoToBilling = async () => {
    // await saveAppointment();
  };

  const handleGoToAnotherAppoint = async () => {
    goToDetails();
  };

  const handleDone = async () => {
    const updatedApt = {
      aptDate: aptDetails?.aptDate,
      aptState: aptDetails?.aptState,
      aptTime: aptDetails?.aptTime,
      aptType: "FOLLOWUP",
      details: "",
      duration: aptDetails?.duration,
      id: aptDetails?.id,
      patientUserId: aptDetails?.patientUserId,
      preference: 10,
      priority: parseInt(formData?.priority),
      providerUserFacilityName: aptDetails?.provider?.facilityName,
      providerUserId: aptDetails?.providerUserId,
      followUpData: JSON.stringify(formData),
      // reasons: newReasons.filter(r => r?.checked)
    };
    try {
      const res = await updateFollowUpAppointment(updatedApt);
      if (res.status) {
        // toast.success(res?.message || 'Follow Up appointment was created successfully')
      }
      console.log("----");
      goToHomeScreen();
    } catch (error) {
      // toast.error(error?.data?.error || error)
    } finally {
    }
  };

  const handleConfirmPreparation = () => {
    handleConfirmAdd();
    setNewPreparations(
      newPreparations.map((p) =>
        _preparationIds.includes(p.id)
          ? { ...p, checked: true }
          : { ...p, checked: false }
      )
    );
  };

  const handleConfirmInstruction = () => {
    handleConfirmAdd();
    setNewInstructions(
      newInstructions.map((p) =>
        _instructionIds.includes(p.id)
          ? { ...p, checked: true }
          : { ...p, checked: false }
      )
    );
  };

  const handleConfirmReason = () => {
    setNewReasons(
      newReasons.map((p) =>
        _reasonIds.includes(p.id)
          ? { ...p, checked: true }
          : { ...p, checked: false }
      )
    );
  };

  const handleConfirmForm = () => {
    setNewForms(
          newForms.map((p) =>
            _formsIds.includes(p.id)
              ? { ...p, checked: true }
              : { ...p, checked: false }
          )
        );
  }

  const initEditor = () => {
    setEditBox({ type: "", show: false });
    setNewTitle("");
    setAddNewItemCheck(false);
  };

  const handleAddPreparation = (title, text) => {
    setNewPreparations([
      ...newPreparations,
      {
        id: uuidv4(),
        title: title || "Preparation",
        description: text,
        checked: addNewItemCheck,
      },
    ]);
    initEditor();
  };

  const handleAddInstruction = (title, text) => {
    setNewInstructions([
      ...newInstructions,
      {
        id: uuidv4(),
        title: title || "Instruction",
        description: text,
        checked: addNewItemCheck,
      },
    ]);
    initEditor();
  };

  const { icd10Codes } = useGetAllICD10Codes();
  const { cptCodes } = useGetAllCPTCodes();

  const [addedIc10Codes, setAddedIc10Codes] = useState([]);
  const [addedCPTCodes, setAddedCPTCodes] = useState([]);

  const handleAddIcd10Codes = () => {
    if(addedIc10Codes.find(e => e.id === formData.icd10CodesFormData)) return;
    if(formData.cptCodesFormData !== ""){
      setAddedIc10Codes(prevState => [...prevState, icd10Codes.find(e => e.id === formData.icd10CodesFormData)]);
    }
  }
  const handleAddCPTCodes = () => {
    if(addedCPTCodes.find(e => e.id === formData.cptCodesFormData)) return;
    if(formData.cptCodesFormData !== ""){
      setAddedCPTCodes(prevState => [...prevState, cptCodes.find(e => e.id === formData.cptCodesFormData)]);
    }
  }

  return (
    <div className="section">
      <FollowUpWrapper>
        <>
          <SectionHeader title={title} onArrowBack={onArrowBack} />
          <Summary>
            <div className="item line1">
              <div>{aptDetails?.provider?.fullName}</div>
              <div>{aptDetails?.provider?.specialty}</div>
            </div>
            <div className="item line2">
              <div>{aptDetails?.patient?.fullName}</div>
              <div>{moment(aptDetails?.patient?.dob).format("M/D/YYYY")}</div>
              <div className="d-flex j-start">
                <span>
                  <ClockIcon color={iconColor} />
                </span>
                <span>
                  &nbsp;{" "}
                  {getTimeFromApt(aptDetails?.aptDate, aptDetails?.aptTime)}
                </span>
              </div>
              <div className="d-flex j-start">
                <Image
                  className="duration"
                  src="/assets/images/sand-clock.png"
                  width="21"
                  height="21"
                />
                <span>&nbsp; {aptDetails?.duration} mins</span>
              </div>
            </div>
          </Summary>
          <Row1>
            <DoubleCheckItem
              desc="Preparations"
              showCheck={newPreparations.some((v) => v.checked)}
              handleClick={() => {
                setShowPreparationsModal(true);
                setEditBox({
                  type: EDITOR_TYPE.PREPARATION,
                  show: false,
                });
              }}
            />
            <DoubleCheckItem
              desc="Instructions"
              showCheck={newInstructions.some((v) => v.checked)}
              handleClick={() => {
                setShowInstructionsModal(true);
                setEditBox({
                  type: EDITOR_TYPE.INSTRUCTION,
                  show: false,
                });
              }}
            />
            <DoubleCheckItem
              desc="Forms"
              showCheck={newInstructions.some((v) => v.checked)}
              handleClick={() => {
                setShowFormsModal(true);
                setEditBox({
                  type: EDITOR_TYPE.FORMS,
                  show: false,
                });
              }}
            />
            {/* <DoubleCheckItem desc="Tasks" showCheck={false} handleClick={() => { }} /> */}
            {/* <div className="double-check-item" onClick={() => setEditBox({ type: EDITOR_TYPE.RESOURCE_NOTIFICATION, show: true })}>Resource <br />Notes
              <Notification number={20} />
            </div> */}
          </Row1>
          <Row2>
            <div className="d-flex">
              <div>
                <Radio
                  checkedIcon={<RadioOnIcon />}
                  icon={<RadioOffIcon />}
                  {...controlProps("period")}
                  sx={{ padding: "5px" }}
                />
              </div>
              <div className="d-flex gap1">
                <SelectPopup
                  value={formData.aptWMD}
                  onChange={(id) => setFormData({ ...formData, aptWMD: id })}
                  options={periodOptions}
                  label="W/M/D"
                  items={periodItems}
                  handleSelectDateOption={handleSelectDateOption}
                />
                <SelectPopup
                  value={formData.aptWMDNumber}
                  onChange={(id) =>
                    setFormData({ ...formData, aptWMDNumber: id })
                  }
                  options={numberOptions}
                  label="No."
                  items={formData.aptWMD ? numberItems(formData.aptWMD) : []}
                  disabled={!formData.aptWMD}
                />
              </div>
            </div>
            <div className="d-flex">
              <Radio
                checkedIcon={<RadioOnIcon />}
                icon={<RadioOffIcon />}
                {...controlProps("datetime")}
                sx={{ padding: "5px" }}
              />
              <div className="d-flex gap1">
                <InputBox
                  caption="Date"
                  showIcon
                  iconType="svg"
                  iconSrc={<CalendarIcon color="#173FD4" />}
                  style={{ width: 90 }}
                  value={displaySelectedDate(formData.aptDate)}
                  onChange={() => {}}
                  onClickInput={() => {
                    setCalendarPopupOptions({ opened: true });
                    handleSelectDateOption(true);
                  }}
                  onClickIcon={() => {
                    setCalendarPopupOptions({ opened: true });
                    handleSelectDateOption(true);
                  }}
                />
                <InputBox
                  caption="Time"
                  style={{ width: 60 }}
                  value={formData.aptTime}
                  onClickInput={() => {
                    setShowTimer(true);
                    handleSelectDateOption(true);
                  }}
                  onChange={() => {}}
                />
              </div>
            </div>
          </Row2>
          <Row3>
            <SelectPopup
              value={formData.virtualVisit}
              onChange={(id) => setFormData({ ...formData, virtualVisit: id })}
              options={virtualVisitOptions}
              label="Virtual visit"
              items={virtualVisitItems}
            ></SelectPopup>
            <InputBox
              caption="Duration"
              type="number"
              value={formData.duration}
              style={{ width: 75 }}
              onChange={(v) => setFormData({ ...formData, duration: v })}
              min={0}
            />
            {/* <div className="history" onClick={() => setShowHistory(true)}>Previous<br />history</div> */}
            <SelectPopup
              value={formData.priority}
              onChange={(id) => setFormData({ ...formData, priority: id })}
              options={appointmentOptions}
              label="Appointment block"
              items={priorityItems}
            />
          </Row3>
          <Row4>
            <SelectPopup
              value={formData.cptCodesFormData}
              onChange={(id) => setFormData({ ...formData, cptCodesFormData: id })}
              options={virtualVisitOptions}
              label="CPT codes"
              items={cptCodes}
            ></SelectPopup>
            <div className="history" onClick={handleAddCPTCodes}>
              Add
            </div>
            <SelectPopup
              value={formData.icd10CodesFormData}
              onChange={(id) => {
                setFormData((prevState) => ({ ...prevState, icd10CodesFormData: id }))
              }}
              options={ICDOptions}
              label="ICD-10 codes"
              items={icd10Codes}
              handleSelectDateOption={handleSelectDateOption}
            />
            <div className="history" onClick={handleAddIcd10Codes}>
              Add
            </div>
          </Row4>
          <Row5>
              <div className="ic10codes-wrapper">
              {
                addedCPTCodes && addedCPTCodes.map((e, i) => (
                  <div className="code-wrapper cptItem" key={i}>
                    <div className="item" >{e.title}</div>
                    <div onClick={() => {
                      const newList = addedCPTCodes.filter(element => element.id !== e.id);
                      setAddedCPTCodes(newList)
                    }}>
                      <VectorIcon />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="ic10codes-wrapper">
              {
                addedIc10Codes && addedIc10Codes.map((e, i) => (
                  <div className="code-wrapper" key={i}>
                    <div className="item" >{e.title}</div>
                    <div onClick={() => {
                      const newList = addedIc10Codes.filter(element => element.id !== e.id);
                      setAddedIc10Codes(newList)
                    }}>
                      <VectorIcon />
                    </div>
                  </div>
                ))
              }
            </div>
          </Row5>
          <Row6>
            <div className="d-flex">
              <div className="check-label">Can't be changed</div>
              <Checkbox
                checkedIcon={<CheckedOnIcon />}
                icon={<CheckedOffIcon />}
                value={formData.cantBeChanged}
                checked={formData.cantBeChanged}
                onChange={() =>
                  setFormData({
                    ...formData,
                    cantBeChanged: !formData?.cantBeChanged,
                  })
                }
              />
            </div>
            {/* <div className="d-flex">
              <div className="check-label">This is a reschedule</div>
              <Checkbox
                checkedIcon={<CheckedOnIcon />}
                icon={<CheckedOffIcon />}
                value={formData.isReschedule}
                checked={formData.isReschedule}
                onChange={() => setFormData({ ...formData, isReschedule: !formData?.isReschedule })}
              />
            </div> */}
          </Row6>
          <Row7>
            <div className="d-flex">
              <div>
                <Radio
                  checkedIcon={<RadioOffIcon />}
                  icon={<RadioOffIcon />}
                  {...controlProps("period")}
                  sx={{ padding: "5px" }}
                />
              </div>
              <div className="d-flex gap1">PRN(as needed)</div>
            </div>
            <div className="d-flex">
              <Radio
                checkedIcon={<RadioOnIcon />}
                icon={<RadioOffIcon />}
                {...controlProps("datetime")}
                sx={{ padding: "5px" }}
              />
              <div className="d-flex gap1">Discharge</div>
            </div>
          </Row7>
          <Row8>
            <div className="title">Reason for visit</div>
            <div
              className="edit"
              onClick={() => {
                setShowReasonsModal(true);
                _setReasonIds([]);
              }}
            >
              Edit
            </div>
            <div className="line">
              1. Appointments are not guaranteed and subject to change or
              cancellation at any time without any notice.
            </div>
            <br></br>
            <div className="line">
              2. Appointment availability is subject to many complex and often
              unpredictable factors.
            </div>
            <DescriptionComponent
              className="line"
              description={mergeReasons(newReasons.filter((r) => r.checked))}
              onClickMore={() =>
                onClickMore(mergeReasons(newReasons.filter((r) => r.checked)))
              }
              maxLength={200}
            />
          </Row8>

          <Box mt={60} px={9}>
            <ActionBtnWrapper twoMoreBtns>
              <ActionBtn
                fontS={22}
                lineH={12}
                style={{ color: "black" }}
                onClick={() => cancel()}
              >
                Cancel
              </ActionBtn>
              <ActionBtn
                fontS={22}
                lineH={22}
                onClick={handleGoToAnotherAppoint}
              >
                Make another appointment
              </ActionBtn>
              {true && (
                <ActionBtn fontS={22} lineH={12} onClick={handleDone}>
                  Done
                </ActionBtn>
              )}
              {false && (
                <ActionBtn fontS={22} lineH={12} onClick={handleGoToBilling}>
                  Go to billing
                </ActionBtn>
              )}
            </ActionBtnWrapper>
          </Box>
        </>
        <Modal isOpened={!!modalDescription}>
          <ModalContent>
            <div>
              {modalDescription &&
                modalDescription
                  .split("\n")
                  .map((line, index) => <p key={`line${index}`}>{line}</p>)}
            </div>
            <button onClick={() => setModalDescription("")}>Okay</button>
          </ModalContent>
        </Modal>
        <TimePicker
          isOpened={showTimer}
          setIsOpened={() => setShowTimer(false)}
          handleSave={(t) => setFormData({ ...formData, aptTime: t })}
        />
        <SelectPopupModal
          onClose={() => setCalendarPopupOptions({ opened: false })}
          show={calendarPopupOptions.opened}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={!selectedDate}
          handleConfirm={() => handleSelectDate()}
          handleCancel={() => {}}
        >
          <CalendarPickerAdvanced
            value={formData.aptDate}
            onCancel={() => {}}
            onSelected={(y, m, d) => onSelectDate(y, m, d)}
          />
        </SelectPopupModal>
        <SelectPopupModal
          onClose={() => setShowPreparationsModal(false)}
          show={showPreparationsModal}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={isConfirmDisabled}
          handleConfirm={handleConfirmPreparation}
          handleCancel={handleCancel}
        >
          <Preparations
            preparations={newPreparations}
            setPreparations={(ids) => _setPreparationIds(ids)}
            title="preparations"
            addNewItemCheck={addNewItemCheck}
            setAddNewItemCheck={setAddNewItemCheck}
            setIsDisabled={setIsConfirmDisabled}
            selectedIds={_preparationIds}
          />
        </SelectPopupModal>
        <SelectPopupModal
          onClose={() => setShowInstructionsModal(false)}
          show={showInstructionsModal}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={isConfirmDisabled}
          handleConfirm={handleConfirmInstruction}
          handleCancel={handleCancel}
        >
          <Preparations
            preparations={newInstructions}
            setPreparations={(ids) => _setInstructionIds(ids)}
            title="instructions"
            addNewItemCheck={addNewItemCheck}
            setAddNewItemCheck={setAddNewItemCheck}
            setIsDisabled={setIsConfirmDisabled}
            selectedIds={_instructionIds}
          />
        </SelectPopupModal>
        <SelectPopupModal
          onClose={() => setShowFormsModal(false)}
          show={showFormsModal}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={isConfirmDisabled}
          handleConfirm={handleConfirmForm}
          handleCancel={handleCancel}

        >
          <Preparations 
            preparations={newInstructions}
            setPreparations={(ids) => _setFormsIds(ids)}
            title="forms"
            addNewItemCheck={addNewItemCheck}
            setAddNewItemCheck={setAddNewItemCheck}
            setIsDisabled={setIsConfirmDisabled}
            selectedIds={_formsIds}
          />
        </SelectPopupModal>
        <SelectPopupModal
          onClose={() => setShowReasonsModal(false)}
          show={showReasonsModal}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={isConfirmDisabled}
          handleConfirm={handleConfirmReason}
          handleCancel={handleCancel}
        >
          <Reasons
            reasons={newReasons}
            setReasons={(ids) => _setReasonIds(ids)}
            setIsDisabled={setIsConfirmDisabled}
          />
        </SelectPopupModal>
        <SelectPopupModal
          onClose={() => setShowHistory(false)}
          show={showHistory}
          items={[]}
          hideCancelButton
          isConformButton
          buttonLabel="Done"
          handleConfirm={() => setShowHistory(false)}
          handleCancel={handleCancel}
        >
          <HistoryWrapper>
            {fakePreviousHistory.map((history) => {
              return (
                <div className="item" key={`history${history.id}`}>
                  <div className="action">{history.action}</div>
                  <div className="name">{history.name}</div>
                  <div className="date">{history.date}</div>
                </div>
              );
            })}
          </HistoryWrapper>
        </SelectPopupModal>
      </FollowUpWrapper>
    </div>
  );
}

const DoubleCheckItem = ({ desc, showCheck, handleClick }) => {
  return (
    <div className="double-check-item" onClick={handleClick}>
      {desc}
      {showCheck && (
        <span className="check-box">
          <CircleCheckIcon />
        </span>
      )}
    </div>
  );
};

const CheckedOnIcon = () => {
  return <Image src={ICONS.checkOn} width={15} height={15} layout="fixed" />;
};

const CheckedOffIcon = () => {
  return <Image src={ICONS.checkOff} width={15} height={15} layout="fixed" />;
};

const RadioOnIcon = () => {
  return <Image src={ICONS.radioOn} width={24} height={24} layout="fixed" />;
};

const RadioOffIcon = () => {
  return <Image src={ICONS.radioOff} width={24} height={24} layout="fixed" />;
};

export default FollowUpAppointment;
