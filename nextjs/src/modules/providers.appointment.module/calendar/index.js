import { useEffect, useState } from 'react'
import { useRef } from 'react';
import Image from "next/image";
import moment from "moment";
import SimpleBar from "simplebar-react";

import useWindowDimensions, { DEVICE_TYPE } from "../../../common/hooks/useWindowDimensions";
import { CalendarIcon, QrIcon, ManIcon, ClockIcon, ArrowLeft, ArrowRight, ShevronLeft } from "../../../common/utils/Icons";
import { MAIN_BODY_PADDING_Y } from "../../patients.service.module/apt/make-apt/shared/constants";
import {
  SearchBoxWrapper,
  FieldWrapper, FilterWrapper,
  AptListWrapper, SectionWrapper, FilteredDisplayWrapper,
} from "./styled";
import SelectPopupModal from "../../../components/modals/SelectPopupModal";
import SelectPopup from "../../../components/SelectPopup";
import { ICONS } from '../../../common/utils/styleGuide';
import { Box } from '../../../components/buzz/Box';
import { Typo } from '../../../components/buzz/Typo';
import { Flex } from '../../../components/buzz/Flex';
import { FilterOptions } from './FilterOptions';
import { SearchBox } from '../shared/SearchBox';
import { CalendarPickerAdvanced } from '../../../components/CalendarPickerAdvanced';
import { ProviderAptCalendar } from '../shared/ProviderAptCalendar';
import { SectionHeader } from '../shared/SectionHeader';

const searchColor = '#173FD4';
const MAX_AUTO_FETCH_TIME = 3;

export default function ProviderAppointmentCalendar({
  goToDetails,
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
  const cardListHeightOnDesktop = sectionHeight - (device === DEVICE_TYPE.DESKTOP ? 354 : 314);
  const scrollableNodeRef = useRef();

  const [search, setSearch] = useState('')
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({ opened: false });
  const [qrPopupOptions, setQrPopupOptions] = useState({ opened: false, anchorEl: null });
  const [openFilterOptions, setOpenFilterOptions] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [isClickedNextArrow, setIsClickedNextArrow] = useState(false)
  const [authFetchTimes, setAuthFetchTimes] = useState(0)

  useEffect(() => {
    if (!!apts.length) {
      if (timeBlockName) {
        setTimeout(() => {
          const activeItem = document.querySelector(`[name=${timeBlockName}]`);
          if (activeItem) {
            activeItem.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest"
            });
          }
        }, 300)
      } else {
        setTimeout(() => {
          scrollableNodeRef.current.scroll({
            behavior: "smooth",
            top: 0,
          })
        }, 300)
      }
      setAuthFetchTimes(0)
      setTimeBlockName(0)
    } else {
      if (isLessMaxTime()) {
        isClickedNextArrow ? handleNextDate() : handlePrevDate()
        setAuthFetchTimes(authFetchTimes + 1)
      } else {
        setAuthFetchTimes(0)
      }
    }
  }, [apts])

  const isLessMaxTime = () => {
    return authFetchTimes <= MAX_AUTO_FETCH_TIME
  }

  const handleSelectDate = () => {
    if (selectedDate) {
      const mDate = moment(selectedDate).format('YYYY-MM-DD');
      setFilter({
        ...filter,
        dateRange: {
          "startDate": mDate,
          "endDate": mDate
        }
      })
    }
  }
  const onSelectDate = (y, m, d) => {
    setSelectedDate(new Date(y, m - 1, d))
  }

  const handleSelectLocation = (locationId) => {
    setFilter({
      ...filter,
      locationId
    })
  }

  const handleSelectApt = (tb, index, timeBlocks) => {
    goToDetails(tb?.apt?.id)
    const blockName = timeBlocks[index - 1]?.apt ? timeBlocks[index]?.name : timeBlocks[index - 1]?.name
    setTimeBlockName(blockName)
  }

  const handlePrevDate = () => {
    const prevDate = moment(filter.dateRange.startDate).add(-1, 'day')
    setFilter({
      ...filter,
      dateRange: {
        "startDate": prevDate.format('YYYY-MM-DD'),
        "endDate": prevDate.format('YYYY-MM-DD')
      }
    })
    setIsClickedNextArrow(false)
  }

  const handleNextDate = () => {
    const nextDate = moment(filter.dateRange.startDate).add(1, 'day')
    setFilter({
      ...filter,
      dateRange: {
        "startDate": nextDate.format('YYYY-MM-DD'),
        "endDate": nextDate.format('YYYY-MM-DD')
      }
    })
    setIsClickedNextArrow(true)
  }

  return (
    <div className="section">
      <SectionWrapper>
        {!openFilterOptions && <>
          <SectionHeader
            title={title}
            onArrowBack={onArrowBack}
          />
          <div className="search-desc">First select location and date to load appointments</div>
          <FilterWrapper>
            <SelectPopup
              value={filter?.locationId}
              onChange={(id) => handleSelectLocation(id)}
              options={{ size: { width: 104, height: 40 }, color: searchColor, fontSize: 16 }}
              items={locations.map(l => ({...l, text: l.legalName}))}
              fixedLabel="Location"
            />
            <div className="calendar-icon"
              onClick={(e) => setCalendarPopupOptions({ opened: true, anchorEl: e.currentTarget })}
            >
              <CalendarIcon color={searchColor} />
            </div>
            <div className="qr-icon"
              onClick={(e) => setQrPopupOptions({ opened: true, anchorEl: e.currentTarget })}
            >
              <QrIcon />
            </div>
            <Flex xGap={31}>
              <div onClick={handlePrevDate}>
                <ArrowLeft />
              </div>
              <div onClick={handleNextDate}>
                <ArrowRight />
              </div>
            </Flex>
          </FilterWrapper>
          <FilteredDisplayWrapper>
            <div className='selected-location'>{locations.find(l => l.id === filter.locationId)?.text || 'Location A'}</div>
            <div className='selected-date'>{moment(filter.dateRange.startDate).format('dddd, M/D/YYYY')}</div>
          </FilteredDisplayWrapper>

          <div className="search-desc search-desc1">
            To find a patient not on your calendar, enter:<br />
            Member date of birth, last 4 digits of the SSN, last name, first name
          </div>
          <Box px={18} mt={-12}>
            <Typo color='#979797' fontW={600} lineH={18}>12/31/2019 2233 Jonas James</Typo>
          </Box>
          <SearchBoxWrapper>
            <Box>
              <Flex xGap={15}>
                <SearchBox>
                  <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
                  <div className="magnifier">
                    <Image src={ICONS.magnifyingGlass} width={12} height={12} layout={'fixed'} />
                  </div>
                </SearchBox>
                <Image
                  src={ICONS.highImportantMark}
                  width={28}
                  height={28}
                  layout={'fixed'}
                  onClick={() => setOpenFilterOptions(true)}
                />
              </Flex>
            </Box>
            <div className="man-icon"><ManIcon color={searchColor} /></div>
          </SearchBoxWrapper>
          <FieldWrapper>
            <span className="start-time"><ClockIcon color={searchColor} /></span>
            <span className="field patient-name">Name</span>
            <span className="field dob">DOB</span>
            <span className="field provider_name">Provider</span>
            <span className="field reason">Reason</span>
            <Image className="duration" src="/assets/images/sand-clock.png" width="21" height="21" />
          </FieldWrapper>
          <SimpleBar
            style={{ maxHeight: cardListHeightOnDesktop }}
            scrollableNodeProps={{ ref: scrollableNodeRef }}
          >
            <AptListWrapper>
              {apts && !!apts.length && (
                <ProviderAptCalendar
                  startTime={new Date(apts[0].aptDate + "T" + apts[0].aptTime)}
                  endTime={new Date(apts[apts.length - 1].aptDate + "T" + apts[apts.length - 1].aptTime)}
                  aptList={apts}
                  setAptList={setApts}
                  selectedApt={selectedApt}
                  handleSelectApt={handleSelectApt}
                />
              )}
            </AptListWrapper>
          </SimpleBar>
        </>}
        {openFilterOptions && <>
          <FilterOptions
            handleClose={setOpenFilterOptions}
          />
        </>}
        <SelectPopupModal
          onClose={() => setCalendarPopupOptions({ opened: false })}
          show={calendarPopupOptions.opened}
          items={[]}
          isConformButton={true}
          isConfirmDisabled={!filter?.dateRange.startDate}
          handleConfirm={() => handleSelectDate()}
          handleCancel={() => { }}
        >
          <CalendarPickerAdvanced
            value={new Date(filter?.dateRange?.startDate)}
            onCancel={() => { }}
            onSelected={(y, m, d) => onSelectDate(y, m, d)}
          />
        </SelectPopupModal>
      </SectionWrapper>
    </div >

  )
}

