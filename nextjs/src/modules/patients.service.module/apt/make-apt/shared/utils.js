import Image from 'next/image'

import DateIOAdapter from "@mui/lab/AdapterMoment";
import { styled as customStyled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import { ICONS } from '../../../../../common/utils/styleGuide'


const CustomPickersDay = customStyled(PickersDay, {})((props) => {
  const { selected, today, outsideCurrentMonth } = props
  return ({
    ...(selected && {
      border: '2px solid #173FD4!important',
      background: 'white!important',
      color: '#173FD4!important',
    }),
    ...(today && {
      color: '#173FD4!important',
    }),
    ...(!outsideCurrentMonth && {
      color: 'black!important'
    }),
    ...({
      fontSize: '13px!important',
      fontWeight: 400,
    })
  })
})

export const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
  return (
    <CustomPickersDay
      {...pickersDayProps}
    />
  );
};

export const DateIcon = (props) => (
  <Image
    src={ICONS.calendar}
    width={19} height={19}
  />
)

export const LeftArrowButtonBlue = (props) => (
  <Image
    src={ICONS.arrowLeftBlue}
    width={7} height={14}
  />
)

export const RightArrowButtonBlue = (props) => (
  <Image
    src={ICONS.arrowRightBlue}
    width={7} height={14}
  />
)

export const CustomAdapter = (options) => {
  const adapter = new DateIOAdapter(options);

  const constructUpperObject = (text) => ({ toUpperCase: () => text });
  const constructDayObject = (day) => ({ charAt: () => constructUpperObject(day) });

  return {
    ...adapter,
    getWeekdays() {
      const customWeekdays = adapter.getWeekdays();
      return customWeekdays.map((day) => constructDayObject(day));
    }
  }
}
