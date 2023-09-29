import { useState, useEffect, useRef } from "react";
import moment from "moment";
import AptCardSmall from "../../AptCardSmall";
import { APT_TYPE_TO_SEARCH, MEETING_TYPE } from "../../data";
import { getTimeslotString } from "./utils";
import { getAptColor } from "../utils";
import { ViewWrapper, TimeslotWrapper } from "./styled";

const STEP = 60; // minutes of timeslot

const CalendarView = ({
  weekDates,
  apts,
  setApts,
  selectedAptType,
  onClickApt,
  selectedApt,
}) => {
  const viewRef = useRef(null);
  const spaceRef = useRef(null);
  const [curWeekapts, setCurWeekapts] = useState([]);
  const [timeslotHeights, setTimeslotHeights] = useState([]);

  // Create elements for timeslots e.g. 12 AM to 12 AM
  const displayTimeslotLabels = (arr) => {
    let element = [];
    for (let i = 0; i <= 1440; i += STEP) {
      element.push(
        <TimeslotWrapper key={i} height={arr[parseInt(i / 60)]}>
          <div className="time">{getTimeslotString(i)}</div>
          <div className="space"></div>
        </TimeslotWrapper>
      );
    }
    return element;
  };

  useEffect(() => {
    let arrNew = [];
    for (let i = 0; i < 24; i++) arrNew[i] = 60;
    curWeekapts.map((apt) => {
      let aptTime = moment(new Date(apt.aptDate + " " + apt.aptTime));
      arrNew[aptTime.format("H")] = 120;
    });
    setTimeslotHeights(arrNew);
    let first_apt_available = 0;
    for (let i = 0; i < 24; i++) {
      if (arrNew[i] != 60) first_apt_available = i;
    }
    viewRef.current.scrollTop = first_apt_available * 60;
  }, [curWeekapts]);

  // Set current week availability from apts on change of startdate
  useEffect(() => {
    let arrNew = [];
    apts.map((apt) => {
      if (apt.aptState == "ACTIVE") {
        let aptDate = moment(new Date(apt.aptDate + " " + apt.aptTime)).format(
          "YYYY-MM-DD"
        );
        if (
          weekDates.length &&
          weekDates[0].isSameOrBefore(aptDate) &&
          weekDates[weekDates.length - 1].isSameOrAfter(aptDate)
        ) {
          arrNew.push(apt);
        }
      }
    });
    setCurWeekapts(arrNew);
  }, [weekDates, apts]);

  return (
    <ViewWrapper ref={viewRef}>
      <div className="timeslot-space-wrapper" ref={spaceRef}>
        <div>
          {curWeekapts.map((apt, index) => {
            if (apt.aptState != "ACTIVE") return;

            if (
              selectedAptType != APT_TYPE_TO_SEARCH.ALL &&
              apt.aptType != selectedAptType
            )
              return;

            let aptTime = moment(new Date(apt.aptDate + " " + apt.aptTime));
            let left = 42 + aptTime.diff(weekDates[0], "day") * 100; //26 is the TIme visible left pixel
            let top = 0;
            for (let i = 0; i < aptTime.format("H"); i++)
              top += timeslotHeights[i];
            top += aptTime.format("m") * 2;
            return (
              <div
                key={apt.id + index}
                style={{
                  position: "absolute",
                  left: left,
                  top: top,
                  zIndex: 10,
                }}
              >
                {/* Border for selected Apt */}
                <div
                  style={{
                    display: selectedApt?.id === apt.id ? "block" : "none",
                    border: "2px solid green",
                    border: "2px solid green",
                    position: "absolute",
                    width: "100%",
                    top: "-2px",
                    height: "22px",
                  }}
                ></div>
                {/* Cross dash */}
                <div
                  style={{
                    position: "absolute",
                    width: "58px",
                    borderTop: `2px solid ${getAptColor(apt)}`,
                    top: "6px",
                    left: "9px",
                  }}
                ></div>
                <AptCardSmall
                  apt={apt}
                  selectedApt={selectedApt}
                  setApt={(v) =>
                    setApts(apts.map((u) => (u.id == v.id ? v : u)))
                  }
                  onClick={() => onClickApt(apt)}
                />
              </div>
            );
          })}
          {displayTimeslotLabels(timeslotHeights)}
        </div>
      </div>
    </ViewWrapper>
  );
};

export default CalendarView;
