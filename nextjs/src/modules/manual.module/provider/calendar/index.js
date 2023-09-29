import { useEffect, useState } from "react";
import { useRef } from "react";
import Image from "next/image";
import moment from "moment";
import SimpleBar from "simplebar-react";
import { SpinnerWrapper } from "../../../../common/styleds/common.styled";
import { CircularProgress } from "@mui/material";

import useWindowDimensions, {
  DEVICE_TYPE,
} from "../../../../common/hooks/useWindowDimensions";
import {
  CalendarIcon,
  QrIcon,
  ManIcon,
  ClockIcon,
  ArrowLeft,
  ArrowRight,
  ShevronLeft,
} from "../../../../common/utils/Icons";
import { MAIN_BODY_PADDING_Y } from "../../../patients.service.module/apt/make-apt/shared/constants";
import {
  SearchBoxWrapper,
  FieldWrapper,
  TotalFilterWrapper,
  FilterWrapper,
  ArrowWrapper,
  GoWrapper,
  AptListWrapper,
  SectionWrapper,
  FilteredDisplayWrapper,
  RescheduleCancelBarWrapper,
} from "./styled";
import SelectPopupModal from "../../../../components/modals/SelectPopupModal";
import SelectPopup from "../../../../components/SelectPopup";
import NoAptModal from "../../../../components/modals/NoAptModal";
import { ICONS } from "../../../../common/utils/styleGuide";
import { Box } from "../../../../components/buzz/Box";
import { Typo } from "../../../../components/buzz/Typo";
import { Flex } from "../../../../components/buzz/Flex";
import { FilterOptions } from "./FilterOptions";
import { SearchBox } from "../shared/SearchBox";
import { CalendarPickerAdvanced } from "../../../../components/CalendarPickerAdvanced";
import { ProviderAptCalendar } from "../shared/ProviderAptCalendar";
import { SectionHeader } from "../shared/SectionHeader";
import { useRouter } from "next/router";
import RescheduledAppointmentsModal from "../../../../components/modals/RescheduleAppointmentModal";
import { getAptDateByPrevdate, getAptDateByNextdate } from "../../../../common/lib/appointment";
const searchColor = "#173FD4";
const MAX_AUTO_FETCH_TIME = 3;

export default function ProviderAppointmentCalendar({
  // goToDetails,
  goToFolowUp,
  filter,
  setFilter,
  apts,
  setApts,
  timeBlockName,
  setTimeBlockName,
  selectedApt,
  title,
  onArrowBack,
  locations,
}) {
  const { height, device } = useWindowDimensions();
  const sectionHeight = height - 2 * MAIN_BODY_PADDING_Y;
  const cardListHeightOnDesktop =
    sectionHeight - (device === DEVICE_TYPE.DESKTOP ? 354 : 314);
  const scrollableNodeRef = useRef();

  const [search, setSearch] = useState("");
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({
    opened: false,
  });
  const [rescheduledPopupOptions, setRescheduledPopupOptions] = useState({
    opened: false,
    type: "rescheduled",
  });
  const [qrPopupOptions, setQrPopupOptions] = useState({
    opened: false,
    anchorEl: null,
  });
  const [openFilterOptions, setOpenFilterOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isClickedNextArrow, setIsClickedNextArrow] = useState(false);
  const [authFetchTimes, setAuthFetchTimes] = useState(0);
  const route = useRouter();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("No Appointment");
 
  const handleSelectDate = () => {
    if (selectedDate) {
      const mDate = moment(selectedDate).format("YYYY-MM-DD");
      setFilter({
        ...filter,
        dateRange: {
          startDate: mDate,
          endDate: mDate,
        },
      });
    }
  };
  const onSelectDate = (y, m, d) => {
    setSelectedDate(new Date(y, m - 1, d));
  };

  const handleSelectLocation = (locationId) => {
    setFilter({
      ...filter,
      locationId,
    });
  };

  const handleSelectApt = (tb, index, timeBlocks) => {
    // goToDetails(tb?.apt?.id)
    const blockName = timeBlocks[index - 1]?.apt
      ? timeBlocks[index]?.name
      : timeBlocks[index - 1]?.name;
    setTimeBlockName(blockName);
  };

  const handlePrevDate = async() => {
    const INIT_FILTER = {
      providerUserId: filter.providerUserId,
      dateRange: {
        startDate: filter.dateRange.startDate,
        endDate: filter.dateRange.endDate
      }
    }
    const prevDate = await getAptDateByPrevdate(INIT_FILTER)
    if (prevDate != null) {
      setFilter({
        ...filter,
        dateRange: {
          "startDate": prevDate,
          "endDate": prevDate
        }
      })
    } else {      
      setShowConfirmModal(true)
      setModalMessage("We don't have any data before " + filter.dateRange.endDate)
    }
    setIsClickedNextArrow(false)
  }

  const handleNextDate = async() => {
    const INIT_FILTER = {
      providerUserId: filter.providerUserId,
      dateRange: {
        startDate: filter.dateRange.startDate,
        endDate: filter.dateRange.endDate
      }
    }
    const nextDate = await getAptDateByNextdate(INIT_FILTER)
    if (nextDate != null) {
      setFilter({
        ...filter,
        dateRange: {
          "startDate": nextDate,
          "endDate": nextDate
        }
      })
    } else {
      setShowConfirmModal(true)
      setModalMessage("We don't have any data after " + filter.dateRange.endDate)
    }
    setIsClickedNextArrow(true)
  }

  const removeProc = () => {
    setIsOpenedRemovePopup(false)
  }

  return (
    <div className="section">
      <SectionWrapper>
        {!openFilterOptions && (
          <>
            <SectionHeader title={title} onArrowBack={onArrowBack} />
            <div className="search-desc">
              First select location and date to load appointments
            </div>
            <TotalFilterWrapper>
              <FilterWrapper>
                <SelectPopup
                  value={filter?.locationId}
                  onChange={(id) => handleSelectLocation(id)}
                  options={{
                    size: { width: 94, height: 34 },
                    color: searchColor,
                    fontSize: 16,
                  }}
                  items={locations.map((l) => ({ ...l, text: l.legalName }))}
                  fixedLabel="Location"
                />
                <div
                  className="calendar-icon"
                  onClick={(e) =>
                    setCalendarPopupOptions({
                      opened: true,
                      anchorEl: e.currentTarget,
                    })
                  }
                  style={{display: 'flex'}}
                >
                  <CalendarIcon color={searchColor} />
                </div>                
                <GoWrapper>
                  <div>
                    Go
                  </div>
                </GoWrapper>
                </FilterWrapper>     
              <ArrowWrapper>
                <div onClick={handlePrevDate}>
                  <ArrowLeft />
                </div>
                <div onClick={handleNextDate}>
                  <ArrowRight />
                </div>
              </ArrowWrapper>
            </TotalFilterWrapper>
            <FilteredDisplayWrapper>
              <div className="selected-location">
                {locations.find((l) => l.id === filter.locationId)?.legalName ||
                  "Location"}
              </div>
              <div className="selected-date">
                {moment(filter.dateRange.startDate).format("dddd, M/D/YYYY")}
              </div>
            </FilteredDisplayWrapper>
            {
              showConfirmModal && (
                <NoAptModal 
                  open={showConfirmModal}
                  message={modalMessage}
                  rightBtnText="OK"
                  handleOk={() => setShowConfirmModal(false)}
                  handleClose={() => setShowConfirmModal(false)}
                />)
            }
            <div className="search-desc search-desc1">
              To find a patient not on your calendar, enter:
              <br />
              Member date of birth, last 4 digits of the SSN, last name, first
              name
            </div>
            <Box px={18} mt={-12}>
              <Typo color="#979797" fontW={600} lineH={18}>
                12/31/2019 2233 Jonas James
              </Typo>
            </Box>
            <SearchBoxWrapper>
              <Box>
                <Flex xGap={15}>
                  <SearchBox>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                    />
                    <div className="magnifier">
                      <Image
                        src={ICONS.magnifyingGlass}
                        width={12}
                        height={12}
                        layout={"fixed"}
                      />
                    </div>
                  </SearchBox>
                  {/* <Image
          
          0src={ICONS.highImportantMark}
                  width={28}
                  height={28}
                  layout={'fixed'}
                  onClick={() => setOpenFilterOptions(true)}
                /> */}
                </Flex>
              </Box>
              {/* <div className="man-icon"><ManIcon color={searchColor} /></div> */}
            </SearchBoxWrapper>
            <RescheduleCancelBarWrapper>
              <div
                onClick={() =>
                  setRescheduledPopupOptions({
                    opened: true,
                    type: "rescheduled",
                  })
                }
              >
                Rescheduled
              </div>
              <div
                onClick={() =>
                  setRescheduledPopupOptions({ opened: true, type: "canceled" })
                }
              >
                Canceled
              </div>
            </RescheduleCancelBarWrapper>
            <FieldWrapper>
              <span className="start-time">
                <ClockIcon color={searchColor} />
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
            <SimpleBar
              style={{ maxHeight: cardListHeightOnDesktop }}
              scrollableNodeProps={{ ref: scrollableNodeRef }}
            >
     
              <AptListWrapper>
                {(apts && !!apts.length)?
                  <ProviderAptCalendar
                    startTime={
                      new Date(apts[0].aptDate + "T" + apts[0].aptTime)
                    }
                    endTime={
                      new Date(
                        apts[apts.length - 1].aptDate +
                          "T" +
                          apts[apts.length - 1].aptTime
                      )
                    }
                    aptList={apts}
                    setAptList={setApts}
                    selectedApt={selectedApt}
                    handleSelectApt={handleSelectApt}
                    goToFolowUp={goToFolowUp}
                  />:<SpinnerWrapper>
                  <CircularProgress size={20}/>
                </SpinnerWrapper>
              }                
              </AptListWrapper>
            </SimpleBar>
          </>
        )}
        {openFilterOptions && (
          <>
            <FilterOptions handleClose={setOpenFilterOptions} />
          </>
        )}
        <SelectPopupModal
          onClose={() => setCalendarPopupOptions({ opened: false })}
          show={calendarPopupOptions.opened}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={!filter?.dateRange.startDate}
          handleConfirm={() => handleSelectDate()}
          handleCancel={() => {}}
        >
          <CalendarPickerAdvanced
            value={new Date(filter?.dateRange?.startDate)}
            onCancel={() => {}}
            onSelected={(y, m, d) => onSelectDate(y, m, d)}
          />
        </SelectPopupModal>
        <RescheduledAppointmentsModal
          show={rescheduledPopupOptions.opened}
          onClose={() => setRescheduledPopupOptions({ opened: false })}
          type={rescheduledPopupOptions.type}
        />
      </SectionWrapper>
    </div>
  );
}
