import {useState} from "react";
import MobilePicker from "../MobilePicker";
import {SelectTime} from "./styled";
import SelectPopupModal from "../modals/SelectPopupModal";
import * as moment from "moment/moment";

export default function TimePicker(props) {
  const {
    isOpened,
    setIsOpened,
    handleSave,
  } = props

  const [date, setDate] = useState({
    valueGroups: {
      month: 4,
      day: 4,
    },
    optionGroups: {
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }
  });

  const [time, setTime] = useState({
    valueGroups: {
      hour: 4,
      minute: 4,
    },
    optionGroups: {
      hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minute: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    }
  });

  const [meridiem, setMeridiem] = useState({
    valueGroups: {
      meridiem: 'AM',
    },
    optionGroups: {
      meridiem: ['AM', 'PM']
    }
  });

  const handleTimeslotChange = (field, name, value) => {
    switch (field) {
      case 'date':
        setDate(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
      case 'time':
        setTime(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
      case 'meridiem':
        setMeridiem(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
    }
  };

  const handleDone = () => {
    setIsOpened(false);
  }

  const handleReset = () => {
    setDate({...date, valueGroups: { month: 4, day: 4 }});
    setTime({...time, valueGroups: { hour: 4, minute: 4 }});
    setMeridiem({...meridiem, valueGroups: { meridiem: "AM" }});
  }

  const handleConfirm = () => {
    // let newAlert = {};
    // newAlert.datetime = moment(new (`${new Date('Y')}-${date.valueGroups.month}-${date.valueGroups.day} ${time.valueGroups.hour}:${time.valueGroups.minute}:00 ${meridiem.valueGroups.meridiem}`)).format('HH:mm:ss');
    const selectedTime = `${time.valueGroups.hour}:${time.valueGroups.minute} ${meridiem.valueGroups.meridiem}`
    handleReset();
    setIsOpened(false);
    if (handleSave) handleSave(selectedTime);
  }

  return (
    <SelectPopupModal
      onClose={() => setIsOpened(false)}
      show={isOpened}
      items={[]}
      isConformButton
      hideCancelButton
      buttonLabel="Done"
      handleConfirm={() => handleConfirm()}
    >
      <SelectTime>
        <div className="left">
          <div className="datetime-pick">
            <div className="time-pick">
              <div className="label">Time</div>
              <MobilePicker
                optionGroups={time.optionGroups}
                valueGroups={time.valueGroups}
                onChange={(n, v) => handleTimeslotChange('time', n, v)}
                itemHeight={22}
                height={66}
                width={150}
                padding={0}
                separator=":"
              />
            </div>
            <div className="meridiem-pick">
              <MobilePicker
                optionGroups={meridiem.optionGroups}
                valueGroups={meridiem.valueGroups}
                onChange={(n, v) => handleTimeslotChange('meridiem', n, v)}
                itemHeight={22}
                height={66}
                width={44}
                padding={10}
                separator=""
              />
            </div>
          </div>
        </div>
      </SelectTime>
    </SelectPopupModal>
  )
}