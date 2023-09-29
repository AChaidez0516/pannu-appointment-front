import { useState } from "react";
import Calendar from "../shared/Calendar";
import { APT_TYPE_TO_SEARCH } from "../shared/data";
import { AptListViewWrapper, CalendarViewWrapper } from "./styled";

export default function ViewApts({
  apts,
  setApts,
  onViewPreparations,
  onViewTransactionHistory,
  onReschedule,
  onCancel,
  setCurrentScreen,
  setSelectedApt,
  selectedApt,
}) {
  const [selectedAptType, setSelectedAptType] = useState(
    APT_TYPE_TO_SEARCH.ALL
  );

  return (
    <div className="section">
      <AptListViewWrapper>
        <div className="header-desktop">Available apointments</div>
        <CalendarViewWrapper>
          <Calendar
            apts={apts}
            setApts={setApts}
            selectedAptType={selectedAptType}
            setSelectedApt={setSelectedApt}
            selectedApt={selectedApt}
            setCurrentScreen={setCurrentScreen}
            onViewPreparations={onViewPreparations}
            onViewTransactionHistory={onViewTransactionHistory}
            onReschedule={onReschedule}
            onCancel={onCancel}
          />
        </CalendarViewWrapper>
      </AptListViewWrapper>
    </div>
  );
}
