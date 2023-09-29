import { useState, useEffect } from 'react'
import moment from 'moment'
import CalendarToolbar from "./CalendarToolbar";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";
import AptCard from "../apt-card";
import Modal from '../../../../../../components/Modal'
import { CalendarWrapper, CalendarBody, ModalContent } from "./styled";

const TODAY = moment({hour: 0, minute: 0, seconds: 0});

const Calendar = ({ apts, setApts, selectedAptType, onViewPreparations, onViewTransactionHistory, onReschedule, onCancel }) => {
  const [startDate, setStartDate] = useState(TODAY);
  const [endDate, setEndDate] = useState(TODAY);
  const [weekDates, setWeekDates] = useState([]);
  const [selectedApt, setSelectedApt] = useState(null);
  const [isOpenAptModal, setIsOpenAptModal] = useState(false);

  useEffect(() => {
    let i;
    let dates = [];
    for (i = 0; i < 3; i ++) {
      let date = moment(startDate).add(i, 'days');
      dates.push(date);
      if (i == 2) {
        setEndDate(date);
        setWeekDates(dates);
      }
    }
  }, [startDate]);

  const handleChangeStartDate = (newDate) => {
    // if (newDate.isBefore(TODAY, 'day')) {
    //   setStartDate(TODAY);
    // } else {
    //   setStartDate(newDate);
    // }
    setStartDate(newDate);
    console.log(weekDates)
  }

  return (
    <CalendarWrapper>
      <CalendarToolbar startDate={startDate} endDate={endDate} handleChangeStartDate={handleChangeStartDate} />
      <CalendarBody>
        <CalendarHeader startDate={startDate} weekDates={weekDates} handleChangeStartDate={handleChangeStartDate} />
        <CalendarView weekDates={weekDates} apts={apts} selectedAptType={selectedAptType} onClickApt={(v) => { setSelectedApt(v); setIsOpenAptModal(true); }} />
      </CalendarBody>
      {selectedApt && (
        <Modal isOpened={isOpenAptModal} zIndex={100}>
          <ModalContent>
            <AptCard 
              key={selectedApt.id} 
              apt={selectedApt}
              setApt={(v) => { setApts(apts.map(u => u.id == selectedApt.id ? v : u)); setSelectedApt(v); }}
              isInModal={true}
              showModal={setIsOpenAptModal}
              onViewPreparations={(apt) => { onViewPreparations(apt); setIsOpenAptModal(false); }}
              onViewTransactionHistory={(apt) => { onViewTransactionHistory(apt); setIsOpenAptModal(false); }}
              onReschedule={() => { onReschedule(selectedApt); setIsOpenAptModal(false); }}
              onCancel={() => { onCancel(selectedApt); setIsOpenAptModal(false); }}
            />
            <button onClick={() => { setSelectedApt(null); setIsOpenAptModal(false); }}>Okay</button>
          </ModalContent>
        </Modal>
      )}
    </CalendarWrapper>
  );
}

export default Calendar;
