import { useState, useEffect } from "react";
import moment from "moment";
import CalendarToolbar from "./CalendarToolbar";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";
import CalendarTitle from "./CalendarTitle";
import {
  CalendarWrapper,
  CalendarBody,
  FirstSelectAppointment,
  ListViewButton,
  ListViewButtonGroup,
  SelectedAppointmentItem,
  SelectedAppointment,
} from "./styled";
import { getAptColor } from "./utils";
import { RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material";
import { APT_TYPE_TO_SEARCH, SCREENS } from "../data";

const TODAY = moment({ hour: 0, minute: 0, seconds: 0 });

const Calendar = ({
  apts,
  selectedAptType,
  selectedApt,
  setSelectedApt,
  setCurrentScreen,
}) => {
  const [startDate, setStartDate] = useState(TODAY);
  const [endDate, setEndDate] = useState(TODAY);
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    let i;
    let dates = [];
    for (i = 0; i < 3; i++) {
      let date = moment(startDate).add(i, "days");
      dates.push(date);
      if (i == 2) {
        setEndDate(date);
        setWeekDates(dates);
      }
    }
  }, [startDate]);

  const handleChangeStartDate = (newDate) => {
    setStartDate(newDate);
  };

  return (
    <CalendarWrapper>
      <CalendarToolbar
        startDate={startDate}
        endDate={endDate}
        handleChangeStartDate={handleChangeStartDate}
      />
      <CalendarBody>
        <CalendarTitle />
        <CalendarHeader
          startDate={startDate}
          weekDates={weekDates}
          handleChangeStartDate={handleChangeStartDate}
        />
        <CalendarView
          weekDates={weekDates}
          apts={apts}
          selectedAptType={selectedAptType}
          selectedApt={selectedApt}
          onClickApt={(v) => {
            setSelectedApt(v);
          }}
        />
      </CalendarBody>
      <SelectedAppointment>Selected appointment time</SelectedAppointment>
      {selectedApt ? (
        <>
          <SelectedAppointmentItem color={getAptColor(selectedApt)}>
            <div>{`${
              selectedApt.aptDay.charAt(0).toUpperCase() +
              selectedApt.aptDay.slice(1).toLowerCase()
            } ${selectedApt.aptDate}`}</div>
            <div>{`Start time ${selectedApt.aptTime}${
              Number(selectedApt.aptTime.slice(0, 2)) > 11 ? "PM" : "AM"
            }`}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#F00"
            >
              <path
                d="M9.8 0C4.39643 0 0 4.39643 0 9.8C0 15.2036 4.39643 19.6 9.8 19.6C15.2036 19.6 19.6 15.2036 19.6 9.8C19.6 4.39643 15.2036 0 9.8 0ZM9.8 1.50769C14.3887 1.50769 18.0923 5.21134 18.0923 9.8C18.0923 14.3887 14.3887 18.0923 9.8 18.0923C5.21134 18.0923 1.50769 14.3887 1.50769 9.8C1.50769 5.21134 5.21134 1.50769 9.8 1.50769ZM6.95046 5.86492L5.86492 6.95046L8.71748 9.8L5.86643 12.6495L6.95197 13.7351L9.8 10.8833L12.6495 13.7328L13.7351 12.6495L10.8833 9.8L13.7328 6.95046L12.6495 5.86492L9.8 8.71748L6.95046 5.86643V5.86492Z"
                fill="#FF0000"
              />
            </svg>
          </SelectedAppointmentItem>
          {selectedApt.aptType === APT_TYPE_TO_SEARCH.REGULAR && (
            <RadioGroup
              defaultValue="female"
              name="radio-buttons-group"
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Make this a preferred appointment <br />
                    Your appointment is assured except if unavoidable
                  </Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label={
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Put me on the waiting list
                  </Typography>
                }
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label={
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Continue as regular appointment
                  </Typography>
                }
              />
            </RadioGroup>
          )}
        </>
      ) : (
        <FirstSelectAppointment>
          First select the appointment you want from the table above
        </FirstSelectAppointment>
      )}
      <ListViewButtonGroup>
        <ListViewButton>Cancel</ListViewButton>
        <ListViewButton
          onClick={() => setCurrentScreen(SCREENS.APPOINTMENT_DATA)}
        >
          Next
        </ListViewButton>
      </ListViewButtonGroup>
    </CalendarWrapper>
  );
};

export default Calendar;
