import styled from "styled-components"
import PropTypes from 'prop-types'
import ExpandBusyTimesComponent from "./ExpandBusyTimesComponent"
// import { OurContextProvider } from "./calendar/context"
// import DateRangeComponent from "./calendar/DateRangeComponent"
import ChooseCalendarSectionComponent from "./ChooseCalendarSectionComponent"
import AppointmentCalendar from "./calendar"
import StepWrapperComponent from "../shared/StepWrapperComponent"

import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

export default function StepOneComponent(props) {
  const {
    calendarType,
    topTitle,
    busyTimesProps,
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
    appointmentCalendarProps,
    chooseCalendarSectionComponentProps,
  } = props

  const { width } = useWindowDimensions()
  const deviceWidth = width;

  return (
    <StepWrapperComponent>
      {deviceWidth >= 1024 && <CalendarLabel>{topTitle} <br /><br /> {calendarType.label}</CalendarLabel>}
      <ExpandBusyTimesComponent
        busyTimesProps={busyTimesProps}
      />
      {/* <OurContextProvider> */}
        {/* <DateRangeWrapper>
          <DateRangeComponent
            selectedDateToFetchSlots={selectedDateToFetchSlots}
            setSelectedDateToFetchSlots={setSelectedDateToFetchSlots} />
        </DateRangeWrapper> */}
        <AppointmentCalendar
          {...appointmentCalendarProps}          
        />
      {/* </OurContextProvider> */}
      <ChooseCalendarSectionComponent
        {...chooseCalendarSectionComponentProps}
      />
    </StepWrapperComponent>
  )
}

StepOneComponent.propTypes = {
  busyTimesProps: PropTypes.object.isRequired,
  appointmentCalendarProps: PropTypes.object.isRequired,
  chooseCalendarSectionComponentProps: PropTypes.object.isRequired,
}

export const DateRangeWrapper = styled.div`
  margin-top: 16px;
  padding: 18px 18px;
  display: flex;
  justify-content: flex-end;
`

export const CalendarLabel = styled.div`
  font-weight: 600 !important;
  font-size: 18px;
  line-height: 11px;
  letter-spacing: -0.165px;
  color: #000000;
  text-align: center;
  margin-bottom: 20px;
`